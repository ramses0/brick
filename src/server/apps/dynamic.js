require('marko/node-require');

const express = require('express');
const dynamic = express();
const path = require('path');
const marko = require('marko/express');
const indexTemplate = require(path.join(__dirname, '..', '..', '/views/index'));

dynamic.use(marko());

dynamic.get('/', (req, res) => {
  res.marko(indexTemplate, {
    title: 'Homepage',
    name: 'Fred',
    age: 35
  });
});

console.log('[App: Dynamic] initialized.');
module.exports = dynamic;