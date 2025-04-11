const ENV = {
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    environment: (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production' | 'test'
}

export default ENV