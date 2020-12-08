const recolectorDeVotos = require("./recolectorDeVotos");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

// Convierte una petición recibida a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;
const recolector = new recolectorDeVotos();

app.listen(port, function(){
  console.log(`Server running in http://localhost:${port}`);
});

setImmediate(recolector.obtenerVotosSenadores);
setInterval(recolector.obtenerVotosSenadores, 300000);
setImmediate(recolector.obtenerVotosDiputades);
setInterval(recolector.obtenerVotosDiputades, 300000);

app.get('/senadores', function(req, res){
	res.status(200).send(recolector.votosAcumuladosSenadores()); 
});

app.get('/diputades', function(req, res){
	res.status(200).send(recolector.votosAcumuladosDiputades()); 
});