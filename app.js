const express = require('express')
const app = express()

const bodyParser = require('body-parser')
//body - parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short-url', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
const URL = require('./models/url')

const generateCode = require('./public/function/generateCode')
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const origin_URL = req.body.origin_URL
  console.log(origin_URL)
  let varURLCode = generateCode(5)
  console.log("test")
  URL.find()
    .lean()
    .then(urlcollection => {
      const repeatbanner = urlcollection.find(url => url.origin_URL === origin_URL)
      console.log(repeatbanner)
      if (repeatbanner) {

        res.redirect('/')
        // res.render('show', { repeatbanner })
      }
      else {
        while (urlcollection.find(url => url.URLCode === varURLCode)) {
          console.log("in")
          varURLCode = generateCode(5)
        }
        const Schmea = Object.assign({
          origin_URL: req.body.origin_URL,
          URLCode: varURLCode
        })
        return URL.create(Schmea)
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))

      }
    })

})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})


