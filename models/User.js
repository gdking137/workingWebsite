const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

//schema


const userSchema = mongoose.Schema({
    name: {
        type: String,
        malength:10
    },
    email: {
        type: String,
        trim: true,
        unique:1 
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        minlength: 5
    },
    image: String,
    token: {
        type: String,
        minlength: 5
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function(next){

    var user = this;

    if(user.isModified('password')){



            //비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err)


        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comarePassword = function(plainPassword, cb){
//plainPassword example: 1234567 = 암호화된 비밀번호
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
    })

}

const User = mongoose.model('user', userSchema)
module.exports = {User}