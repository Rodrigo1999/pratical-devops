import ENV from "@config/env.config";
import db from "@pokeapp/infra/db/db-mysql/db";

const DB_HEALTH_TIMEOUT = 2000;

export default class AppHealth {
    async dbIsLive() {
        try {
            if(ENV.DATABASE_TYPE === 'json') return true;
            
            await db.raw('SELECT 1').timeout(DB_HEALTH_TIMEOUT, { cancel: true });
            return true;
        } catch (error) {
            console.error('[HealthCheck][DB] error:', error);
            return false;
        }
    }
}