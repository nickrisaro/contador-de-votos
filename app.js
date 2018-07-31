const http = require('http');
const recolectorDeVotos = require("./recolectorDeVotos");

const hostname = '0.0.0.0';
const port = 3000;
var requestCount = 1;

const recolector = new recolectorDeVotos();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');
  console.log("Pedidos:" + requestCount++);
  res.end(JSON.stringify(recolector.votosAcumulados()));
});

server.on('error', (e) => {
  console.log('Error en el servidor: ' + e.message);
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

setImmediate(recolector.obtenerVotos);
setInterval(recolector.obtenerVotos, 3600000);
