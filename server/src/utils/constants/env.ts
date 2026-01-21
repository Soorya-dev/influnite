const getEnv = (key:string,defaultValue?:string):string =>{
    const value  = process.env[key]||defaultValue
    if(value === undefined){
        throw new Error(`Missing environment variable${key}`)
    }

    return value
}


// export const MONGO_URI = getEnv("MONGO_URI")
// export const PORT = getEnv("PORT","3000")
// export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET")
// export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET")
// export const ACCESS_TOKEN_EXPIRY_MIN = getEnv("ACCESS_TOKEN_EXPIRY_MIN")
// export const REFRESH_TOKEN_EXPIRY_DAY = Number(getEnv("REFRESH_TOKEN_EXPIRY_DAY"))
// export const EMAIL_USER = getEnv("EMAIL_USER")
// export const EMAIL_PASS = getEnv("EMAIL_PASS")
// export const APP_ORIGIN = getEnv("APP_ORIGIN")
// export const PASSWORD_SALT_ROUNDS = Number(getEnv("PASSWORD_SALT_ROUNDS", "10"))
// export const APP_NAME = getEnv("APP_NAME")
// export const REDIS_URL = getEnv("REDIS_URL")