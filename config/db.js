const {Pool} = require("pg")
const config = require("config")

const pool = new Pool({
    user: config.get("db.username"),
    password: config.get("db.password"),
    database: config.get("db.name"),
    host: config.get("db.host"),
    port: config.get("db.port"),
})

module.exports = pool