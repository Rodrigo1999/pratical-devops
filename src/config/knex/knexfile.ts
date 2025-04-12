import ENV from "../env.config";
import type { Knex } from "knex";

// Update with your config settings.

const common = {
  migrations: {
    tableName: "knex_migrations",
    directory: 'mysql_migrations'
  },
  pool: {
    min: 2,
    max: 10
  },
}
const config: { [key in 'development' | 'staging' | 'production' | 'test']: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      database: ENV.DATABASE_NAME,
      user: ENV.DATABASE_USER,
      password: ENV.DATABASE_PASSWORD,
      port: ENV.DATABASE_PORT,
      ssl: ENV.DATABASE_SSL
    },
    ...common
  },

  test: {
    client: "mysql2",
    connection: {
      database: ENV.DATABASE_NAME,
      user: ENV.DATABASE_USER,
      password: ENV.DATABASE_PASSWORD,
      port: ENV.DATABASE_PORT,
      ssl: ENV.DATABASE_SSL
    },
    ...common
  },

  staging: {
    client: "mysql2",
    connection: {
      database: ENV.DATABASE_NAME,
      user: ENV.DATABASE_USER,
      password: ENV.DATABASE_PASSWORD,
      port: ENV.DATABASE_PORT,
      ssl: ENV.DATABASE_SSL
    },
    ...common
  },

  production: {
    client: "mysql2",
    connection: {
      database: ENV.DATABASE_NAME,
      user: ENV.DATABASE_USER,
      password: ENV.DATABASE_PASSWORD,
      port: ENV.DATABASE_PORT,
      ssl: ENV.DATABASE_SSL
    },
    ...common
  }
};

export default config
