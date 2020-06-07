// importar a dependencia do sqlite3
let sqlite3 = require("sqlite3").verbose();

// iniciando o objeto do banco de dados
let db = new sqlite3.Database("./src/database/database.db")

