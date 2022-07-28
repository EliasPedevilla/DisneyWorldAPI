import { User } from '../models/index.js'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { sendWelcomeEmail } from '../utlis/mailSender.js'

export const register = async (req, res, next) => {
  const { username, email, password } = req.body

  if (!password || !username || !email) {
    return res.status(400).send('Incomplete fields')
  }

  if (typeof (username) !== 'string' || typeof (email) !== 'string') {
    return res.status(400).send('The username and email must be a string')
  }

  try {
    const repeatUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    })

    if (repeatUser) {
      return res.status(400).send('Your email or username already exists')
    }

    if (typeof (password) !== 'string') {
      return res.status(400).send('The password must be a string')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const user = {
      password: hash,
      username,
      email
    }

    await User.create(user)

    await sendWelcomeEmail(email)

    res.status(201).json(user)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('In the body there are incorrect or empty fields')
    } else {
      next(error)
    }
  }
}

export const login = async (req, res, next) => {
  const { password, userIdentification } = req.body
  try {
    if (!password || !userIdentification) {
      return res.status(400).send('Incomplete fields')
    }

    if (typeof (userIdentification) !== 'string' || typeof (password) !== 'string') {
      return res.status(400).send('The userIdentification and password must be a string')
    }

    const user = await User.findOne({
      where: { [Op.or]: [{ username: userIdentification }, { email: userIdentification }] }
    })

    if (!user) {
      return res.status(400).send('The user does not exist')
    }

    const validatePassword = bcrypt.compareSync(password, user.password)

    if (!validatePassword) {
      return res.status(400).send('Incorrect password')
    }

    const token = jwt.sign({ userIdentification }, 'admin', {
      expiresIn: '24h'
    })

    res.status(200).send(token)
  } catch (error) {
    next(error)
  }
}
