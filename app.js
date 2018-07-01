const http = require('http');
const https = require('https');

const hostname = '0.0.0.0';
const port = 3000;

var options = {
  hostname: 'sheets.googleapis.com',
}

const acumuladorDeVotos = {
  aFavor: 0,
  enContra: 0,
  noConfirmado: 0,
  seAbstiene: 0
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.end(JSON.stringify(acumuladorDeVotos));
});

server.on('error', (e) => {
  console.log('Error en el servidor: ' + e.message);
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

setImmediate(obtenerVotos, acumuladorDeVotos);
setInterval(obtenerVotos, 60000, acumuladorDeVotos);

function obtenerVotos(acumuladorDeVotos) {
  console.log('Buscando nuevos votos');

  var request = https.request(options, function (res) {
    var data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {

      const votos = JSON.parse(data).values;

      var aFavor = 0;
      var enContra = 0;
      var noConfirmado = 0;
      var seAbstiene = 0;

      votos.forEach(voto => {
        const posicion = voto[0];
        if(posicion === 'A Favor') {
          aFavor++;
        } else if(posicion === 'En Contra') {
          enContra++;
        } else if(posicion === 'No confirmado') {
          noConfirmado++;
        } else if(posicion === 'Se Abstiene') {
          seAbstiene++;
        } else {
          console.log('Voto no reconocido ' + voto[0]);
        }
      });

      acumuladorDeVotos.aFavor = aFavor;
      acumuladorDeVotos.enContra = enContra;
      acumuladorDeVotos.noConfirmado = noConfirmado;
      acumuladorDeVotos.seAbstiene = seAbstiene;

    });
  });
  request.on('error', (e) => {
      console.log('Error accediendo a los datos: ' + e.message);
  });
  request.end();


}