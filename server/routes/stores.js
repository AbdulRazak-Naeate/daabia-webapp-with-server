const express = require('express');
const router = express.Router();
const Store= require('../models/Store');
const verify =require('./verifyToken');
const {storeValidation} = require('../validation');
const {uploadImage,updateImage}= require('../upload');
const fs = require('fs');
const mongoose = require('mongoose');
//Get all stores
router.get('/',async(req,res)=>{
    try{
        const stores = await Store.find();
        res.json({store:stores});
    
    }catch(err){
        res.json({message:err});
    }
});

//Submit a store
router.post('/',uploadImage('./server/uploads/stores'),verify,async(req,res)=>{

    const {error} = storeValidation(req.body);

    //Validation
    if (error) return  res.status(400).send(error.details[0].message);

    //check if store already exist
    const storeExist = await Store.findOne({name:req.body.name});
    if (storeExist) return res.json({message:"Store name already exist"}).status(402).send("Store name already taken");
    console.log("catId "+req.body.categoryId);
    //console.log(req.files);
    const store = new Store({
        name:req.body.name,
        userId:req.body.userId,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        phone:req.body.phone,
        email:req.body.email,
        description:req.body.description,
        image:req.files,
        storeCategoryId:req.body.categoryId,
        ghPostGPS:req.body.ghPostGPS,
        validStatus:req.body.validStatus,
        currency:req.body.currency
    });
    try{
       /*  const saveStore = */ await store.save();
        const stores = await Store.find();

        res.json({stores:stores,message:"store created successfully"})
        .status(200);
    }catch(err){
        res.json({store:null,message:err}).status(401)
    }
});

//get specific store
router.get('/:storeId', async (req,res)=>{
    try{
        const store = await Store.findById({_id:req.params.storeId});
        res.json({store:store});
    }catch(err){

        res.json({message:err})
    }
});

//get specific store base on userId
router.get('/user/:userId', async (req,res)=>{
    try{
        const store = await Store.find({userId:req.params.userId});
       /*  .where('userId')
        .in(req.params.userId); */
        res.json({store:store,message:"successfully loaded",status:200});
    }catch(err){
        res.json({message:err,status:400})
    }
  });


//delete Specific store

router.delete('/:storeId', async (req,res)=>{
     try{ 
          const store =await Store.findById({_id:req.params.storeId});
          var images=store.image;
          const removeStore = await Store.remove({_id:req.params.storeId});

          images.forEach( image=>{
             
            fs.unlink('server/uploads/stores/'+image.filename,(err) =>{
              if(err){
                  console.error(err)
                  return
              }
 
          })

         
          });
          res.json(removeStore);
     }catch(err){
         res.json({message:err})
     }
});
  


//update Store
router.patch('/:storeId',async (req,res)=> {
    try{
        var oId= new mongoose.Types.ObjectId(req.params.storeId);
        var query= {
            name:req.body.name,
            email:req.body.email,
            description:req.body.description,
            phone:req.body.phone,
            country:req.body.country,
            state:req.body.state,
            city:req.body.city,
            currency:req.body.currency,
         };
        const updateStore = await Store.findOneAndUpdate(
            {_id: oId},
              {
                $set: query  
              },{new:true,useFindAndModify:false}

              );
            var newData={
                name:updateStore.name,
                email:updateStore.email,
                description:updateStore.description,
                phone:updateStore.phone,
                country:updateStore.country,
                state:updateStore.state,
                city:updateStore.city,
                currency:updateStore.currency,
                }
           
             var updated=JSON.stringify(query)===JSON.stringify(newData)
             if(!updated) return res.status(400).send("store not modified");

             res.json(updateStore);
    }catch(err){
        res.json({message:err});
    }

    
});
router.post('/updateImage/:storeId',updateImage('./server/uploads/stores'),async (req,res)=>{
    try{
      res.json({message:"image updated",status:200})
    }catch(err){

        res.json({message:err})
    }
});
module.exports = router ;
