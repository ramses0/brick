const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const app = express();
const compression = require('compression');
const PORT = process.env.PORT || 9000;
const compressResponse = req => {
  if (req.headers['x-no-compression']) {
    return false;
  }

  return true;
}

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

app.use(compression({filter: compressResponse}));

app.all('/_ah/health', (req, res) => res.sendStatus(200));
app.use('/static', require('./apps/static'));
app.use('/', require('./apps/dynamic'));

spdy.createServer(options, app).listen(PORT, _ => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
