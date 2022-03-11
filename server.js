const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

var db
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(
  'mongodb+srv://Harimad:tjdwls12@cluster0.cqork.mongodb.net/todoapp?retryWrites=true&w=majority',
  { useUnifiedTopology: true },
  function (에러, client) {
    if (에러) return console.log(에러)

    db = client.db('todoapp')

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
  응답.send('전송완료')
  db.collection('post').insertOne(
    { title: 요청.body.title, date: 요청.body.date },
    function (에러, 결과) {
      console.log('저장완료')
    }
  )
})
