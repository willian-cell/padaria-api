const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(cors());
server.use(jsonServer.bodyParser);

// Utilitário simples para IDs
function uid(prefix="id") {
  return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
}

// Garante id em POST
server.post("/produtos", (req, res, next) => {
  if (!req.body.id) req.body.id = uid("p");
  next();
});

server.post("/movimentacoes", (req, res, next) => {
  if (!req.body.id) req.body.id = uid("m");
  next();
});

// Endpoint de saúde
server.get("/health", (req, res) => res.json({ ok: true }));

// Usa o router do json-server
server.use(router);

// Porta Render/Local
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Padaria API rodando na porta", PORT);
});
