const express = require('express')
const app = express()

app.listen(8080, function () {
  console.log('listening on 8080')
})

app.get('/pet', function (요청, 응답) {
  응답.send('PET SITE')
})

app.get('/beauty', function (req, res) {
  res.send('BEAURY SITE')
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
