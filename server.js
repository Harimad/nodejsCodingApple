const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

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
  db.collection('counter').findOne(
    { name: '게시물갯수' },
    function (에러, 결과) {
      var 총게시물갯수 = 결과.totalPost
      db.collection('post').insertOne(
        {
          _id: 총게시물갯수 + 1,
          title: 요청.body.title,
          date: 요청.body.date,
        },
        function (에러, 결과) {
          db.collection('counter').updateOne(
            { name: '게시물갯수' },
            { $inc: { totalPost: 1 } },
            function (에러, 결과) {
              if (에러) {
                return console.log(에러)
              }
              응답.send('전송완료')
            }
          )
        }
      )
    }
  )
})

app.get('/list', function (요청, 응답) {
  db.collection('post')
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과)
      응답.render('list.ejs', { posts: 결과 })
    })
})

app.delete('/delete', function (요청, 응답) {
  요청.body._id = parseInt(요청.body._id)
  db.collection('post').deleteOne(요청.body, function (에러, 결과) {
    console.log('삭제완료')
    응답.status(200).send({ message: '성공했습니다' })
  })
})
