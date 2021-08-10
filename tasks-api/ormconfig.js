module.exports = {
    "name": process.env.NODE_ENV,
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "synchronize": false,
    "logging": true,
    "entities": ["src/**/*.entity.ts", "dist/**/*.entity.js"], 
    "migrations": ["src/migration/**/*.ts", "dist/migration/**/*.js"], 
    "subscribers": ["src/subscriber/**/*.ts", "dist/subscriber/**/*.js"],
    "cli": {
       "entitiesDir": "src",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
}
