declare namespace Pokeapp{
    interface DbJsonPersist{
        get(): Promise<Pokeapp.DbSchema.Db>
        write(dbJson: Pokeapp.DbSchema.Db): Promise<void>
    }
}