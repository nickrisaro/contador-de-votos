const https = require('https');

const { ID_PLANILLA, GOOGLE_API_KEY } = process.env

const options = {
  hostname: 'sheets.googleapis.com',
  path: '/v4/spreadsheets/' + ID_PLANILLA + '/values/Nuevo%20Congreso!K260:K331?key=' + GOOGLE_API_KEY,
}

const acumuladorDeVotosSenadores = {
  aFavor: 0,
  enContra: 0,
  noConfirmado: 0,
  seAbstiene: 0,
  fechaUltimaActualizacion: 0
}

class RecolectorDeVotos {

    obtenerVotosSenadores() {
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

          if(votos != undefined && votos != null) {
            votos.forEach(voto => {
              const posicion = voto[0].toLowerCase();
              if(posicion === 'a favor') {
                aFavor++;
              } else if(posicion === 'en contra') {
                enContra++;
              } else if(posicion === 'indefinido' || posicion === 'sin datos') {
                noConfirmado++;
              } else if(posicion === 'abstención/ausente') {
                seAbstiene++;
              } else {
                console.log('Voto no reconocido ' + voto[0]);
              }
            });

            acumuladorDeVotosSenadores.aFavor = aFavor;
            acumuladorDeVotosSenadores.enContra = enContra;
            acumuladorDeVotosSenadores.noConfirmado = noConfirmado;
            acumuladorDeVotosSenadores.seAbstiene = seAbstiene;
            acumuladorDeVotosSenadores.fechaUltimaActualizacion = Date.now();
          } else {
            console.log('No hay votos: ' + data);
            console.log(data);
          }
        });
      });
      request.on('error', (e) => {
          console.log('Error accediendo a los datos: ' + e.message);
      });
      request.end();

    }

    votosAcumuladosSenadores() {
        return acumuladorDeVotosSenadores;
    }
}

module.exports = RecolectorDeVotos;