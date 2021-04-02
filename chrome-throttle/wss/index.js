const WebSocket = require('ws');
const yargs = require('yargs');

const wss = new WebSocket.Server({
  port: yargs.argv.port ?? 10081,
});

wss.on('connection', (ws) => {
  console.log(`Connected established at ${Date.now()}`);
  // setTimeout(() => {
  //   const t = Date.now();
  //   console.log(`Send timestamp at ${t}`);
  //   ws.send(t);
  // }, 6 * 60 * 1000);
  ws.on('message', (message) => {
    console.log(message);
  });
  ws.on('close', () => {
    console.log('connection closed');
  })
});
