// importar a dependencia do sqlite3
let sqlite3 = require("sqlite3").verbose();

// iniciando o objeto do banco de dados
let db = new sqlite3.Database("./src/database/database.db")

// utilizando o objeto do banco de dados para as operações do sistema

// db.serialize( () => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id_places INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)
//   let query = `
//     INSERT INTO places (
//         image, 
//         name,
//         address, 
//         address2, 
//         state, 
//         city, 
//         items 
//     ) VALUES (
//         ?,?,?,?,?,?,?        
//     );`

//   let values = [
//     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     "Papersider",
//     "Guilherme Genballa, Jardim América",
//     "N°260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis e Papelão",
//   ]

//   function afterInsertData(err){
//     if(err)
//       return console.log(err);
   
//     console.log("Cadastrado com sucesso");
//     console.log(this);
//   }

//   // db.run(query, values, afterInsertData);

//   // consultar os arquivos
//   // db.all(`SELECT * FROM places`, function(err, rows){
//   //   if(err)
//   //     return console.log(err);

//   //   console.log("Registros")
//   //   console.log(rows)
//   // })

//   // deletar os arquivos
//     // db.run(`DELETE FROM places WHERE id_places = ?`, [3], function(err){
//     //   if(err)
//     //     return console.log(err);

//     //   console.log("Registro deletado com sucesso");
//     // })
// })

module.exports = db