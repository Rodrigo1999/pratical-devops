import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('address', function(table){
        table.increments('id').primary().index()
        table.string('full_address')
        table.integer('pokemon_id').index()
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('pokemon')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('address')
}