const mongoose = requre('mongoose');
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

const User = mongoose.model('user', userSchema)
module.exports = {User}