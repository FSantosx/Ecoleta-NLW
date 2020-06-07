// template engine
let nunjucks = require("nunjucks");
let express = require("express");
// exportando o banco
let db = require("./database/db.js")
let server = express();

// configurar pasta publica
server.use(express.static("public"));

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

nunjucks.configure("src/views", {
  express: server,
  // desabilita o cache durante o desenvolvimento
  noCache: true,
});


// configurar as rotas para as paginas
// req: requisicao
// res: resposta
server.get("/", ( req, res ) => {
  return res.render("index.html");  
});

server.get("/create-point", ( req, res ) => {
  // req.query

  return res.render("create-point.html");  
});

server.post("/savepoint", (req, res) => {
  // console.log(req.body)
  // inserir dados no banco
  let query = `
    INSERT INTO places (
        image, 
        name,
        address, 
        address2, 
        state, 
        city, 
        items 
    ) VALUES (
        ?,?,?,?,?,?,?        
    );`

  let values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err){
    if(err){
      console.log(err);
      return res.send("Erro no cadastro");
    }
      
   
    console.log("Cadastrado com sucesso");
    console.log(this);
    return res.render("/create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData);
})

server.get("/search-results", ( req, res ) => {
  let search = req.query.search
  if (search == ""){
    // pesquisa vazia
    return res.render("search-results.html", { total: 0 })
  }

  // pegando os dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err)
      return console.log(err);
    
    console.log("Registros");
    console.log(rows);
    // exibir a pagina html com os dados do banco de dados
    let total = rows.length;
    return res.render("search-results.html", { places: rows, total: total });
  }) 
});

// habilitando o servidor
server.listen(3000);