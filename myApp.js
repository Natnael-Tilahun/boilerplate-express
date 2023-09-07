let express = require('express');
require('dotenv').config();
let app = express();
const bodyParser = require('body-parser');
const absolutePath = __dirname + '/views/index.html';

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app
  .route('/name')
  .get((req, res) => {
    res.json({ name: req.query.first + ' ' + req.query.last });
  })
  .post((req, res) => {
    res.json({ name: req.body.first + ' ' + req.body.last });
  });

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == 'uppercase')
    res.json({ message: 'HELLO JSON' });
  else res.json({ message: 'Hello json' });
});

module.exports = app;
