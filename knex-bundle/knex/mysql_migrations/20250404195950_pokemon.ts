import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('pokemon', function(table){
        table.increments('id').primary().index()
        table.string('name', 100)
        table.integer('score')
        table.string('poke_id', 10)
        table.timestamp('last_evolve_at').defaultTo(knex.fn.now())
        table.boolean('is_released').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('pokemon')
}

