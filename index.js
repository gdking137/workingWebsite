const express = require('express')
const app = express()
const port = 4000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://davidkim:Rmdgbf123*@boilerplate.yk2ho3m.mongodb.net/?retryWrites=true&w=majority', {
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})