const double = require('@mongoosejs/double');
const mongoose = require('mongoose');


const OrderSchema  =  new mongoose.Schema({
    
     name:{
         type:String,
         required:true
     },
     storeId:{
         type:String,
         required:true
     },
     productId:{
        type:String,
        required:true
    },
    orderNumber:{
        type:String,
        required:true
    },
    orderType:{
        type:String,
        required:true,
        default:'normal',
    },
    color:{
        type:String,
        required:false,
        default:null,
    },
    size:{
        type:String,
        required:false,
        default:null
    },
    measurement:{
        type:Object,
        required:false,
    },
    filename:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    priceEach:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    shippingFees:{
        type:Number,
        required:true,
    },
    userId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    status:{
        type:String,
        default:"Processing"
    },
    paymentMethod:{
        type:String,
        required:true
    },
    customer:{
        type:Object(),
        default:{
                username:"",
                firstname:"Abdul Razak",
                lastname:"Abubakari",
                phone:"233548496121",
                }
    },
    shippingData:{
            type:Object(),
            default:{
                country:"",
                state:"",
                city:"",
                street:"",
                homeAddress:""}
    },
    expires:{
        type:Date,
        default:function futureDate(params) {
           var datenow= new Date()
           var futureDate = new Date(datenow.setMonth(datenow.getMonth()+6))
          return futureDate.toISOString()   
        }
    }

}); 

module.exports=mongoose.model('Order',OrderSchema);
