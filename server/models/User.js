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
        type:[
            {_id:{type:mongoose.Schema.Types.ObjectId,index:true,required:true,auto:true},
            firstName : { type:String,  required:false, },
            lastName : { type:String, required:false},
            email: { type:String, required:false },
            phone: { type:String, required:false },
            address1:{ type:String, required:false },
            address2: { type:String, required:false },
             zip: { type:String, required:false },
            countrylabel: { type:String, required:false },
            statelabel : { type:String, required:false },
            citylabel: { type:String, required:false }
              }
        ],
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