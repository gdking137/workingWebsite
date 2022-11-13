const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require('./config/key');

//bodyparser lets server interpret the request and send back the data requested
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! ')
})

app.post('/register', (req, res) =>{
  //회원가입 할때 필요한 정보들을 client에서 가져오면
  //데이터 베이스에 넣는다.


  const user = new User(req.body) 

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({ 
      success: true
    })
  })     //mongodb method
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})