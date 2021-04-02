const getPort = require('get-port');
const execa = require('execa');

(async () => {
  const port = await getPort({ port: 10080 });
  const wssPort = await getPort({ port: 10081 });

  const serverProcess = execa.command(
    `yarn cross-env WSS=${wssPort} webpack serve --port ${port}`,
    {
      stdio: 'inherit',
    },
  );
  const wssProcess = execa.command(`node ./wss/index.js --port ${wssPort}`, {
    stdio: 'inherit',
  });
})();
