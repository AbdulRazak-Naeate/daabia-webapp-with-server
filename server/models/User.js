const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:255

    },
    firstname:{
        type:String,
        required:false,
        max:255,
        default:''
    },
    lastname:{
        type:String,
        required:false,
        max:255,
        default:''
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    fromGoogle:{
        type:Boolean,
        default:false,
        required:true, 
    },
    phone:{
        type:String,
        required:false,
        default:'0'
    },
     addresses:{
        type:Array,
        required:false,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:false
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('User',userSchema);