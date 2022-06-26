const express = require('express');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
require('dotenv/config');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path =require('path');
const fs = require("fs");
const Product = require('./models/Product')

//Import Routes
const productsRoute     = require('./routes/products');
const userRoute         = require('./routes/auth');
const storeRoute        = require('./routes/stores');
const categoryRoute     = require('./routes/categories');
const orders            = require('./routes/orders');
const cartRoute         = require('./routes/carts');
const fwverifyRoute     = require('./routes/fwVerify');
const emailRoute        = require('./routes/email/email');
const productlikeRoute  = require('./routes/productlikers');
const subscribeRoute    = require('./routes/subscribers');
const commentsRoute     = require('./routes/comments');
const analytics         = require('./routes/analytics');
const countries             = require('./routes/world/countries');
const states             = require('./routes/world/states');
const cities             = require('./routes/world/cities');

dotenv.config();

const indexPath  = path.resolve(__dirname, '../client/build', 'index.html');
const whitelist = ['http://localhost:3000',"http://localhost:3001", 'http://localhost:8080', 'https://imtizafriq.herokuapp.com', 'http://imtizafriq.herokuapp.com','https://imtizafriq.com']

const corsOptions = {
  origin: function (origin, callback) {
    //console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
     // console.log("Origin acceptable")
      callback(null, true)
    } else {
    //  console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//MiddleWare
app.use(cors()); // package to allow connections from outisde domains
app.use(express.json({limit:'50mb'})); //body-parser alternate
app.use(pino);

// This endpoint is pinged every 5 mins by uptimerobot.com to prevent 
// free services like Heroku and Now.sh from letting the app go to sleep.
// This endpoint is also pinged every time the client starts in the 
// componentDidMount of App.js. Once the app is confirmed to be up, we allow 
// the user to perform actions on the client.
app.get('/wake-up', (req, res) => res.json('👌'))

//Route MiddleWares
app.use(express.static('public'));
app.use('/server/uploads',express.static('./server/uploads'));//making uploads folder accessible
app.use('/api/user',    userRoute);
app.use('/api/products',productsRoute);
app.use('/api/stores',  storeRoute);
app.use('/api/category', categoryRoute);
app.use('/api/orders',orders);
app.use('/api/carts',cartRoute);
app.use('/api/verifypayment',fwverifyRoute);
app.use('/api/email',emailRoute);
app.use('/api/productlikes',productlikeRoute);
app.use('/api/subscribe',subscribeRoute);
app.use('/api/comments',commentsRoute);
app.use('/api/analytics',analytics);
app.use('/api/countries',countries);
app.use('/api/states',states);
app.use('/api/cities',cities);

//Home Routes
 app.get('/version',(req,res)=>{
     res.send('Daabia Web App  version 0.1')
 })
const options={ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:true }
//Connect to DB
mongoose.connect(process.env.DB_COMMUNITY_CON, options)

    const db = mongoose.connection
    db.once('open', _ =>{
         console.log('Database connected : ')
    })  
    db.on('error',err =>{
        console.error('connection eror: ',err)
     })

     //load static build folder
     if (process.env.NODE_ENV === 'production') {   
        // console.log("node env : "+process.env.NODE_ENV)

        // Serve any static files
        app.use(express.static(path.resolve(__dirname, '../client/build')));
        
      // Handle React routing, return all requests to React app
        app.get('/*', async(req, res)=> {
          console.log("query productid from any request "+ req.query.productId)
         try{
          var pid=req.query.productId
          var product;
            console.log("productid "+pid)
        if (pid!==undefined){
                    product = await Product.findById({_id:pid});
        }else{
           product={
             _id:'rh485ureie9e99itr8867uu77',
            name:'Picommerce',
            description:'Multi vendor ecommerce website',
            image:[{path:`server/uploads/products/White Black Kaftan -1646470083381.jpg`}]
          }
        }
          
           fs.readFile(indexPath,'utf8',(err,htmlData)=>{
             
             if (err){
               console.error("Error during file reading")
               return res.status(404).end()

             } 
           //console.log(product)
             htmlData=htmlData.replace("<title>Daabia</title>",`<title>${product.name}</title>`)
             .replace('__META_OG_TITLE__',product.name)
             .replace('__META_OG_DESCRIPTION__',product.description)
             .replace('__META_DESCRIPTION__',product.description)
             .replace('__META_OG_URL__',`http://localhost:3001/proceedcheckout?productId=${product._id}`)
             .replace('__META_URL__',`http://localhost:3001/proceedcheckout?productId=${product._id}`)
             .replace('__META_OG_IMAGE__',product.image[0].path)
              //console.log(htmlData);
             res.send(htmlData)
             /*  fs.writeFileSync(indexPath,htmlData,{encoding:'utf8',flag:'w'}) */

           /*   res.render('index.html',{"myname":"Abdul rAZAK","__META_DESCRIPTION__":"Unique Dress"}) */
           })
           
           }catch(err){
           console.log(err)
         }
         
          //res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        });
      } 

    
//Start lestening to the server
app.set('PORT',process.env.PORT||3001 );
app.listen(app.get('PORT'),()=>{
    console.log(`Server is running on ${app.get('PORT')}`);
});