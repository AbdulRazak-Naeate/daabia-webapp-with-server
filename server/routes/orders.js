const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order= require('../models/Order');
const Store  =  require('../models/Store');
const verify = require('../routes/verifyToken');
const {orderValidation} = require('../validation');
const jwt =require('jsonwebtoken');




/* //get all Orders
router.get('/', async(req,res)=>{
      try{
        const orders = await Order.find();
        res.json({orders:orders,status:200});

      }catch(err){
        res.json({message:err})
      }
}); */
//get all Orders base on Store Id
router.get('/:storeId', async(req,res)=>{
    try{
      const orders = await Order.find({storeId:req.params.storeId});
      res.json({orders:orders,status:200});

    }catch(err){
      res.json({message:err})
    }
});

//get all Orders base on user Id
router.get('/user/:userId', async(req,res)=>{
  try{
    var currentDate= new Date()
    const orders = await Order.find({$or:[{userId:req.params.userId,expires:{$gt:currentDate}},{userId:req.params.userId,expires:{$gt:currentDate},status:'Pending'}]}); //get approved or completed order which are lessthan 6 months 
    res.json({orders:orders,status:200});
    
  }catch(err){
    res.json({message:err});
  }
});

//get all Orders base on Store Id and Approved status to populates as sales records
router.get('/approved/:storeId', async(req,res)=>{
    try{
      const orders = await Order.find({storeId:req.params.storeId,status:"Approved"});
      res.json({orders:orders,status:200});

    }catch(err){
      res.json({message:err})
    }
});

//get all Orders base on Store Id and Completed status to populates as sales records
router.get('/completed/:storeId', async(req,res)=>{
  try{
    const orders = await Order.find({storeId:req.params.storeId,status:"Completed"});
    res.json({orders:orders,status:200});

  }catch(err){
    res.json({message:err})
  }
});

//submit order

router.post('/',async (req,res)=>{
      
    //Validation
    const {error} = orderValidation(req.body);
    //check for errors

    if(error) return res.status(400).send(error.details[0].message);
     /* 
    const userId = req.user._id; //get userid

    const store = await Store.findOne({userId:userId});//get user Store

    const storeId = store._id; //get user store id */
  
  //  const ordernum=UniqueOrderNumber();

  console.log("body "+req.body.name);
  var customer={
  firstname:req.body.firstname,
  lastname:req.body.lastname,
  email:req.body.email,
  phone:req.body.phone,
  }
  var shippingData={
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        homeAddress:req.body.homeAddress
  }
      const order = new Order({
          name:req.body.name,
          storeId:req.body.storeId,
          productId:req.body.productId,
          orderNumber:req.body.orderNumber,
          quantity:req.body.quantity,
          color:req.body.color,
          size:req.body.size,
          measurement:req.body.measurement,
          filename:req.body.filename,
          priceEach:req.body.priceEach,
          totalPrice:req.body.totalPrice,
          shippingFees:req.body.shippingFees,
          userId:req.body.userId,
          date:req.body.date,
          status:req.body.status,
          paymentMethod:req.body.paymentMethod,
          customer:customer,
          shippingData:shippingData
      });

 try{
      await order.save();
      var currentDate= new Date()
      //get user order which does not expired  or which is still pending but expires
      const newOrders = await Order.find({$or:[{/* orderNumber:req.body.orderNumber, */userId:req.body.userId,expires:{$gt:currentDate}},{userId:req.body.userId,expires:{$gt:currentDate},status:'Pending'}]});

    res.json({orders:newOrders,status:200});

    }catch(err){
     res.json({message:err})
    }
});

//get specific order
router.get('/:orderId', async (req,res)=>{
    try{
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    }catch(err){
        res.json({message:err})
    }
});

//delete Specific order

router.delete('/:orderId', async (req,res)=>{
    try{
         const removeOrder = await Order.remove({_id:req.params.orderId});

         res.json(removeOrder);
    }catch(err){
        res.json({message:err});
    }
});

//update order
router.patch('/:orderId',async (req,res)=> {
   try{
        var oId= new mongoose.Types.ObjectId(req.params.orderId)
           await Order.findOneAndUpdate(
           {_id: oId},
           {
            $set:{status:req.body.status},
           },
           {new:true,useFindAndModify:false}
           );
           const Orders=await Order.find(
               {storeId:req.body.storeId}
           )
           res.json({data:Orders,status:200});
   }catch(err){
       res.json({message:err});
   }
});

//update many order
router.patch('/many/:ids',async (req,res)=> {
    try{
        console.log(req.body.ids)
        var _ids=JSON.parse(req.body.ids);
       
         await Order.updateMany(
            {
                _id: {  $in:_ids}
            },
            {
             $set:{status:req.body.status},
            }
            ).then(ret=>{
                
                console.log(ret)             
            });
            const Orders=await Order.find(
                {storeId:req.body.storeId}
            )
            res.json({data:Orders,status:200});
    }catch(err){
        res.json({message:err});
    }
 });

 
//update order with temp id to permanent id for user whol already made order without signed in but currently doing
router.patch('/updateuserid/:tempuserId',async (req,res)=> {
  try{
          await Order.findOneAndUpdate(
          {userId: req.params.tempuserId},
          {
           $set:{userId:req.body.userId},
          },
          {new:true,useFindAndModify:false}
          ).then(ret=>{
              res.json(ret);
          });
        
  }catch(err){
      res.json({message:err});
  }
});


 /* router.delete('/delete/expiredorders', async (req,res)=>{
  try{
      var currentDate= new Date()
      console.log(currentDate)
      const deleteExpiredOrder =await Order.deleteMany({expires:{$gte:currentDate},  status:'Approved'})
      res.json(deleteExpiredOrder)
  }catch(err){
    console.log(err)
  }
}) */

/* const orderNumber =()=>{
   var min=10000;
   var max=90000;

   var orderNumber=Math.floor(Math.random()*min)+max;

   return orderNumber;
} */

const UniqueOrderNumber= ()=> {//Unique Identifier
    var result           = '';
   // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters       = '0123456789';

    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
  }

module.exports = router;