require('dotenv').config()
module.exports = {
  client: 'postgres',
  connection: {
    host: process.env.DB_POST_HOST,
    port: process.env.DB_POST_PORT,
    database: process.env.DB_POST_DATABASE,
    user: process.env.DB_POST_USER,
    password: process.env.DB_POST_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
