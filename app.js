const http = require('http');
const recolectorDeVotos = require("./recolectorDeVotos");
const TelegramBot = require('node-telegram-bot-api');

const { TELEGRAM_TOKEN } = process.env

const hostname = '0.0.0.0';
const port = 3000;
var requestCount = 1;
var botRequestCount = 1;

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
setInterval(recolector.obtenerVotos, 300000);

var bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});
bot.getMe().then(function (me) {
    console.log('Hola soy %s!', me.username);
});

bot.onText(/\/start/, function (msg, match) {
    var fromId = msg.from.id;
    var message = "Este bot te dice como va el poroteo por la votación de la IVE en el Senado argentino\n";
    message += "Enviá /votos para ver el estado de los votos en el Senado";
    bot.sendMessage(fromId, message);
});

bot.onText(/\/votos/, function (msg, match) {
  console.log('Pedidos al bot:' + botRequestCount++);
  let votos = recolector.votosAcumulados();
  var fromId = msg.from.id;
  var message = "Por ahora van:\n";
  message += "*" + votos.aFavor + "* a favor\n";
  message += "*" + votos.enContra + "* en contra\n";
  message += "*" + votos.noConfirmado + "* no confirmados\n";
  message += "*" + votos.seAbstiene + "* abstenciones\n";
  message += "Para más información mandá /masinfo";
  bot.sendMessage(fromId, message, {parse_mode: "Markdown"});
});

bot.onText(/\/masinfo/, function (msg, match) {
    var fromId = msg.from.id;
    var message = "Podés encontrar más información en:\n";
    message += "https://activaelcongreso.org \n";
    message += "http://bit.do/poroteoAborto \n";
    bot.sendMessage(fromId, message);
});

bot.onText(/\/about/, function (msg, match) {
  var fromId = msg.from.id;
  var message = "Hecho con <3 por [LAS] de sistemas.\n Seguinos en Twitter, Facebook e Instagram: @lasdesistemas.";
  bot.sendMessage(fromId, message);
});

bot.onText(/\/help/, function (msg, match) {
  var fromId = msg.from.id;
  var message = "Comandos disponibles:\n";
  message += "/votos - para ver el estado de los votos en el Senado\n";
  message += "/masinfo - para ver información detallada sobre la votación\n";
  message += "/about - para saber más de nosotres\n";
  bot.sendMessage(fromId, message);
});