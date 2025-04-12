import path from "path";
import dotenv from 'dotenv'
export const isDev = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV === 'test'
export const isProd = process.env.NODE_ENV === 'production'

let pathEnvs;
if (isDev) pathEnvs = '.env.dev'
if (isTest) pathEnvs = '.env.test'
if (isProd) pathEnvs = '.env'

let filepath: string = ''

if(process.env.RUNING_MIGRATE){
    filepath = path.resolve('..', '..', '..', pathEnvs!)
}else{
    filepath = path.resolve(process.cwd(), pathEnvs || '.env')
}

try {
    const result = dotenv.config({ path: filepath })

    if(result.error) throw result.error
} catch (error) {
    console.debug('Não foi possível encontrar um arquivo .env padrão, as variáveis de ambiente serão carregadas a partir do sistema.')
}

const ENV = {
    isProd,
    isDev,
    isTest,
    environment: (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production' | 'test',
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_PORT: Number(process.env.DATABASE_PORT),
    DATABASE_SSL: process.env.DATABASE_SSL === 'true' ? true : false,
}

export default ENV