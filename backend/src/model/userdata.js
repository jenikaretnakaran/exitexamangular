var mongoose= require("mongoose");

var userSchema= new mongoose.Schema({
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    text:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true,
        unique: true
    }
})

var userdata=mongoose.model('userdata',userSchema);
module.exports= userdata;