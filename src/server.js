let express = require("express");
let server = express();

// configurar pasta publica
server.use(express.static("public"));

// configurar as rotas para as paginas
// req: requisicao
// res: resposta
server.get("/", ( req, res ) => {
  res.sendFile(__dirname + "/views/index.html");  
});

server.get("/create-point", ( req, res ) => {
  res.sendFile(__dirname + "/views/create-point.html");  
});

server.get("/search-results", ( req, res ) => {
  res.sendFile(__dirname + "/views/search-results.html");
});

// habilitando o servidor
server.listen(3000);