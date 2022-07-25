import { User } from '../models/index.js'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { sendWelcomeEmail } from '../utlis/mailSender.js'

export const register = async (req, res, next) => {
  const { username, email, password } = req.body

  if (!password || !username || !email) {
    return res.status(400).json({ msg: 'Incomplete fields' })
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
  const { password, username } = req.body
  try {
    if (!password || !username) {
      return res.status(400).json({ msg: 'fill in the fields!' })
    }

    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email: username }] }
    })

    if (!user) {
      return res.status(400).json({ msg: 'incorrects credentials' })
    }

    const validatePassword = bcrypt.compareSync(password, user.password)

    if (!validatePassword) {
      return res.status(400).json({ msg: 'incorrect password' })
    }

    const token = jwt.sign({ username }, 'admin', {
      expiresIn: '12h'
    })

    res.status(200).json(token)
  } catch (error) {
    next(error)
  }
}
