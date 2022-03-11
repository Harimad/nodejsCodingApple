const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient
MongoClient.connect(
  'mongodb+srv://Harimad:tjdwls12@cluster0.cqork.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  function (에러, client) {
    if (에러) return console.log(에러)
    //서버띄우는 코드는 여기로
    app.listen(8080, function () {
      console.log('listening on 8080')
    })
  }
)

app.get('/', function (요청, 응답) {
  응답.sendFile(__dirname + '/index.html')
})

app.get('/write', function (요청, 응답) {
  응답.sendFile(__dirname + '/write.html')
})

app.post('/add', function (요청, 응답) {
  console.log(요청.body)
  응답.send('전송완료')
})
