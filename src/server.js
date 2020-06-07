// template engine
let nunjucks = require("nunjucks");
let express = require("express");

let server = express();

// configurar pasta publica
server.use(express.static("public"));

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
  return res.render("create-point.html");  
});

server.get("/search-results", ( req, res ) => {
  return res.render("search-results.html");
});

// habilitando o servidor
server.listen(3000);