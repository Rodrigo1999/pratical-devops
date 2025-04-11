import knex from 'knex'
import knexconfig from '@config/knex/knexfile'
import ENV from '@config/env.config'

const db = knex(knexconfig[ENV.environment]);

export default db