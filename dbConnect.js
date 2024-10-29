const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./dbs/data.db');

module.exports = db;