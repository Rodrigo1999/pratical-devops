import type { Knex } from 'knex';

declare module 'knex/types/tables' {
 
  interface Tables {
    pokemon: Pokeapp.DbSchema.PokemonTable
    ability: Pokeapp.DbSchema.AbilityTable
    address: Pokeapp.DbSchema.AddressTable
  }
}