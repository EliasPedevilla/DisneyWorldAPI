import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres', 'postgres', 'nb1097406797', {
  host: 'db.miexohzfvrovqpdkjfcv.supabase.co',
  dialect: 'postgres',
  logging: false
})

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
