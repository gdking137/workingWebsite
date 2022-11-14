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


app.post('/login', (req, res) =>{           //몽고디비 매소드
  //요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({ email: req.body.email}, (err, user)=>{
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "no matching user"
      })
    }

     //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password , (err, isMatch) =>{
      if(!isMatch)
      return res.json({ loginSuccess: false, message: "wrong password"})



      //비밀번호까지 맞다면 토클을 생성한다.
      user.generateToken((err, user) =>{

        
      })
    })


  }) 

 

})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})