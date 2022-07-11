const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

//get transactions

router.get('/transactions', async (req,res)=>{
    const transactions = await Order.find();
    const aggr = await Order.aggregate([{$unwind:'$totalPrice'},
    {
        $group:{
            _id:'0',
            count:{$sum:1},
            total:{$sum:'$totalPrice'}
        }
    }
]);


    res.json({transactions:transactions,total:aggr,message:'transactions loaded'});

});


//get transactions base on store Id

router.get('/transactions/:storeId', async (req,res)=>{
    const transactions = await Order.find({storeId:req.params.storeId});
    const aggr = await Order.aggregate([{$match:{storeId:req.params.storeId}},{$unwind:'$totalPrice'},
    {
        $group:{
            _id:'0',
            count:{$sum:1},
            total:{$sum:'$totalPrice'}
        }
    }
]);

     console.log(transactions)


    res.json({transactions:transactions,total:aggr,message:'transactions loaded'});

});
//transactions and sales report

router.get('/report/:storeId', async (req,res)=>{
    // const analytics =[]
  
      const transactions = await Order.find({storeId:req.params.storeId});
      //get Completed orders = sales 
      const completedAggr = await Order.aggregate([{$match:{$and:[{storeId:req.params.storeId},{status:'Completed'}]}},{$unwind:'$totalPrice'},
      {
          $group:{
              _id:'0',
              count:{$sum:1},
              total:{$sum:'$totalPrice'}
          }
      }
  ]);
  
  //Current orders or imcompleted transactiond
  const inCompletedAggr = await Order.aggregate([{$match:{storeId:req.params.storeId}},{$match:{$or:[{status:'Pending'},{status:'Processing'}]}},{$unwind:'$totalPrice'},
      {
          $group:{
              _id:'0',
              count:{$sum:1},
              total:{$sum:'$totalPrice'}
          }
      }
  ]);
  
  
  const alltimeAggr = await Order.aggregate([{$match:{storeId:req.params.storeId}},{$unwind:'$totalPrice'},
  {
      $group:{
          _id:'0',
          count:{$sum:1},
          total:{$sum:'$totalPrice'}
      }
  }
  ]);
      
  
      res.json({transactions:transactions,completedAggregate:completedAggr,inCompleteAggregate:inCompletedAggr,alltimeAggregate:alltimeAggr,message:'transactions loaded'});
  
  });
  
//get sales base on store Id

router.get('/sales/:storeId', async (req,res)=>{
    const transactions = await Order.find({storeId:req.params.storeId,status:'Completed'});
    const aggr = await Order.aggregate([{$match:{storeId:req.params.storeId,status:'Completed'}},{$unwind:'$totalPrice'},
    {
        $group:{
            _id:'0',
            count:{$sum:1},
            total:{$sum:'$totalPrice'}
        }
    }
]);

     console.log(transactions)


    res.json({transactions:transactions,total:aggr,message:'transactions loaded'});

});
//get store monthly sales


router.post('/sales/monthly/:storeId',async (req,res)=>{
   
     
    var months =[{label:'jan',num:1},{label:'feb',num:2},{label:'mar',num:3},{label:'apr',num:4},
                   {label:'may',num:5},{label:'jun',num:6},{label:'jul',num:7},{label:'aug',num:8},
                   {label:'sep',num:9},{label:'oct',num:10},{label:'nov',num:11},{label:'dec',num:12}];
    var year =parseInt(req.body.year) ;
    var total=0;            
    const data=[];
     for(var i = 0;i < months.length;i++){
         //var m=months[i].num;         
                   
         var m=months[i].num;
         var label=months[i].label;
         console.log(label)
        const transMonthly = await Order.aggregate(
            [
           {
               $match:{status:"Completed",storeId:req.params.storeId}
           },

            {
                $match:{$expr:{
                     $eq:[{$year: "$date"},year]
                  }}
            },
             {
                 $redact:{ 
                 $cond:[
                     { $eq:[{$month:'$date'},m]},
                     "$$KEEP","$$PRUNE"
                 ]
                }
              },{
            $group:{
                _id:'0',
                count:{$sum:1},
                sales:{$sum:'$totalPrice'}
            }
        }
        ]);
        if (transMonthly.length>0){
            data.push({name:label,"Monthly Sales":transMonthly[0].sales});
            total+=transMonthly[0].sales;
            
        }else{
            data.push({name:label,"Monthly Sales":0});

        }
     }
   
     res.json({monthlySales:data,totalSales:total})
})



//get a specific store product monthly sales

router.post('/transactions/product/sales/monthly/:storeId/:productId',async (req,res)=>{

    var months =[{label:'jan',num:1},{label:'feb',num:2},{label:'mar',num:3},{label:'apr',num:4},
                   {label:'may',num:5},{label:'jun',num:6},{label:'jul',num:7},{label:'aug',num:8},
                   {label:'sep',num:9},{label:'oct',num:10},{label:'nov',num:11},{label:'dec',num:12}];

    var year =parseInt(req.body.year) ;
   
    var total=0;  
    var count=0;          
    const data=[];
     for(var i = 0;i < months.length;i++){
         //var m=months[i].num;         
                   
         var m=months[i].num;
         var label=months[i].label;
         var productid=req.params.productId
         var storeid = req.params.storeId
           
        const transMonthly = await Order.aggregate(
            [
                {
                $match:{productId:productid,storeId:storeid}
                },
           {
               $match:{status:"Completed"}
           },

            {
                $match:{$expr:{
                     $eq:[{$year: "$date"},year]
                  }}
            },
             {
                 $redact:{ 
                 $cond:[
                     { $eq:[{$month:'$date'},m]},
                     "$$KEEP","$$PRUNE"
                 ]
                }
              },{
            $group:{
                _id:'0',
                count:{$sum:1},
                sales:{$sum:'$totalPrice'}
            }
        }
        ]);
        if (transMonthly.length>0){ //if get results ,record it
            data.push({name:label,"Monthly Sales":transMonthly[0].sales});
            total+=transMonthly[0].sales;
            count+=transMonthly[0].count;
            
        }else{//no data is found put 0
            data.push({name:label,"Monthly Sales":0});

        }
     }
   
     res.json({monthlySales:data,totalSales:total,count})
})

//get specific product all time sales
router.post('/product/sales',async (req,res)=>{
           

         var productid=req.body.productId
         var storeid = req.body.storeId
           
        const sales = await Order.aggregate(
            [
                {
                $match:{productId:productid,storeId:storeid}
                },
           {
               $match:{status:"Completed"}
           },{
            $group:{
                _id:'0',
                count:{$sum:1},
                sales:{$sum:'$totalPrice'}
            }
        }
        ]);
   
     res.json({totalSales:sales[0].sales,count:sales[0].count})
    
 })

//get all transactions base on store Id

router.post('/transactions/many/ids', async (req,res)=>{
   
       // console.log(req.body.storeIds);
        const _ids=JSON.parse(req.body.storeIds);
        console.log(_ids[0]);
        const analytics = [];
        
        for (var i = 0; i <= _ids.length ; i++){
    

         try{ 
            var  id=_ids[i].id;
            var name=_ids[i].name
              console.log(id)

            
         const transactions = await Order.find({storeId:id});
     
        const aggr = await Order.aggregate([{$match:{storeId:id}},{$unwind:'$totalPrice'},
        {
            $group:{
                _id:'0',
                count:{$sum:1},
                total:{$sum:'$totalPrice'}
            }
        }
    ]);
     
            console.log(aggr)
              var tranxobj={};
              if (aggr.length!==0){
                 tranxobj={storeId:id,
                           name:name,
                           transactions:transactions,
                           total:aggr[0].total,
                           count:aggr[0].count
              }
             }else{
                 tranxobj={storeId:id,name:name,transactions:[],total:0,count:0
             }
            }
              analytics.push(tranxobj);
                   console.log(analytics)
        
        
    

      }catch(err){

           }
        }   
        
        res.json({analytics:analytics});

});

module.exports = router;