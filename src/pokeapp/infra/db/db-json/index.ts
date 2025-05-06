import ENV from '@config/env.config';
import fs from 'fs/promises'

class DbJsonFile implements Pokeapp.DbJsonPersist{

    private static ROOT_DIR = ENV.isProd ? process.cwd()+'/build' : process.cwd()+'/src'

    async get(){

        const file = await fs.readFile(`${DbJsonFile.ROOT_DIR}/pokeapp/infra/db/db-json/db.json`, 'utf-8');
                        
        const dbJson = JSON.parse(file) as Pokeapp.DbSchema.Db

        return dbJson
    }

    async write(dbJson: Pokeapp.DbSchema.Db){
        await fs.writeFile(`${DbJsonFile.ROOT_DIR}/pokeapp/infra/db/db-json/db.json`, JSON.stringify(dbJson), 'utf-8')
    }
}

const dbJsonFile = new DbJsonFile()

export default dbJsonFile