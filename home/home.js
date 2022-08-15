const express = require('express')
const app = express()

app.get('/echo', (req, res) => {
  res.send('home');
});

const path = require('path')
app.use('/', express.static(path.join(__dirname, 'html/pricing')))

app.listen(3000);

