import dotenv from 'dotenv'

dotenv.config()

const config = {
	env: process.env.NODE_ENV ?? 'development',
	port: Number(process.env.PORT) || 5000,
	isProduction: process.env.NODE_ENV === 'production',
}

export default config
