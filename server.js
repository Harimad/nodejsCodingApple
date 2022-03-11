const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

var db
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(
  'mongodb+srv://Harimad:tjdwls12@cluster0.cqork.mongodb.net/todoapp?retryWrites=true&w=majority',
  function (에러, client) {
    if (에러) return console.log(에러)

    db = client.db('todoapp')

    db.collection('post').insertOne(
      { 이름: 'John', _id: 100 },
      function (에러, 결과) {
        console.log('저장완료')
      }
    )

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
