const ws = new WebSocket(`ws://localhost:${wssPort}`);
const t0 = Date.now();

function toSeconds(t) {
  return Math.floor(t / 1000);
}

setInterval(() => {
  console.log(`t: ${toSeconds(Date.now() - t0)}`);
}, 1000);

// for (let i = 0, len = 20; i < len; i++) {
//   setInterval(() => {
//     const a = 1 + 2 + 3 + 4;
//   }, 500);
// }

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send(`t0 + ${toSeconds(Date.now() - t0)}`);
  }, 1000);
});

ws.addEventListener('close', () => {
  console.log('connection closed');
});

window.addEventListener('offline', () => {
  console.log('offline event');
});

window.addEventListener('online', () => {
  console.log('online event');
});

// ws.addEventListener('message', ({ data }) => {
//   const t1 = Date.now();
//   console.log(`Received timestamp ${data} at ${t1}`);
//   setTimeout(() => {
//     const t2 = Date.now();
//     console.log(`Timeout occured at ${t2} after ${toSeconds(t2 - t1)}`);
//   }, 20000);
// });
