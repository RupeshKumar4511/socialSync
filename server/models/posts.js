const mongoose = require('mongoose');

const userPostModel = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:[3,'Username must atleast 3 characters long']
    },
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:[5,'Title must atleast 5 characters long']
    },
    body:{
        type:String,
        required:true,
        trim:true,
        minLength:[10,'Post Content must atleast 10 characters long']
    },
    Tags:{
        type:[String],
        required:true,
        trim:true,
        minLength:[5,'Title must atleast 5 characters long']
    },
    // Image:{
    //     type:String,
    //     ImageData:String
    // }
})

const postModel = mongoose.model('posts',userPostModel);

module.exports = postModel;