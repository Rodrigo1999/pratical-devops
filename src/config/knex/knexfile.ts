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
      database: "pokeapp",
      user: "root",
      password: "123456",
      port: 3306,
      ssl: false
    },
    ...common
  },

  test: {
    client: "mysql2",
    connection: {
      database: "pokeapp",
      user: "root",
      password: "123456",
      port: 3306,
      ssl: false
    },
    ...common
  },

  staging: {
    client: "mysql2",
    connection: {
      database: "pokeapp",
      user: "root",
      password: "123456",
      port: 3306
    },
    ...common
  },

  production: {
    client: "mysql2",
    connection: {
      database: "pokeapp",
      user: "root",
      password: "123456",
      port: 3306
    },
    ...common
  }
};

export default config
