/* eslint-disable no-unused-vars */
import {useState}from 'react';
import {BrowserRouter as Router,Switch,Route,useHistory
} from "react-router-dom";
import  Dashboard from './dashboard/Dashboard';
import './App.css';
import LogIn from "./pages/login/LogIn";
import SignUp from './pages/signup/SignUp';
import {Topbar,Appbar,TopbarcontacInfo,BottomNav,Products,Cart,Orders,ProceedCheckOut,PrefaredStyleCheckOut,Account,CategoryWidget,Footer,AboutUs} from './components';
import React, { useEffect } from 'react';
import axios ,{post,patch} from 'axios';
import CheckOut from './components/checkoutform/checkout/CheckOut';
import { Box } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import {RModal} from './components/modal/RModal'
import { blue, orange,red} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
//  App's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "imtizafriq.firebaseapp.com",
  databaseURL: "https://imtizafriq.firebaseio.com",
  projectId: "imtizafriq",
  storageBucket: "imtizafriq.appspot.com",
  messagingSenderId: "731374409752",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  const ref = React.useRef(null);
  const theme = createTheme({
    palette: {
      primary:{
        main:blue[500],
      /*   main:"#3f51b5", */
      },
        secondary: {
            main:orange[500],
            contrastText:'#fff'
        },
        warning:{
          main:red[100],
          contrastText:'#fff'
        }
      },
});   
   const createTempUserId= ()=>{
     var id='';
    if (localStorage.getItem('temp_id')===null){
       var result = '';
      // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZY';
 
     var charactersLength = characters.length;
     for ( var i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     id =result;
     localStorage.setItem('temp_id',result);

    }else{
      let uid=localStorage.getItem('_id');
      let loggedin=localStorage.getItem('loggedin');
      if (loggedin!==null){
        if (loggedin==='true'){ //if user signed In get user Id from locaStorage
          //console.log(uid)
       id=uid; 
      //localStorage.removeItem('temp_id');

     }else if(loggedin==='false'){
      id=localStorage.getItem('temp_id');

     }
     }else{

        //if user its first time comer and user has not sign In cretae temp id for the user and set it in localStorage
         id=localStorage.getItem('temp_id');
       
     }
    }
     
     return id;
  }
  const[userid]=useState(createTempUserId());
  const[user]=useState(JSON.parse(localStorage.getItem('user')));
     const[favorites,setFovirites]=useState([]);
  const[products,setProducts]=useState([]);
     const[filteredProducts,setFilteredProducts]=useState([]);
     const[product,setProduct]=useState([]);
     const[cart,setCart]=useState({});
     const[itemsCount,setItemsCount]=useState(0);
     const [order,setOrder]=useState({});
     const[myOrders,setMyOrders]=useState([]);
     const[categories,setCategories]=useState([]);
     const[orderCount,setMyOrderCount]=useState(0);
     const[openModal,setOpenModal]=useState(false)
     const paths=['/','/cart','/checkout','/orders','/proceedcheckout','/prefaredstylecheckout','/account','/aboutus'];
  
     let history = useHistory();
     const handleCloseModal = () =>{ 
      setOpenModal(false);
    }
   
    const handleOnchange =(value) => {
      if(value===0){
        history.push('/')
      }else if (value===1){
        history.push('/cart')
      }else if (value===2){
        history.push('/orders')
      }else if (value===3){
        if (localStorage.getItem('loggedin')==="true"){
        history.push('/account') 
        }else{
          setOpenModal(true)

        }
        
      }
    }
    const handleUserClick = () =>{
     if(localStorage.getItem('loggedin')==="true"){
      history.push('/account') 
     }else{
      setOpenModal(true)
     }
    }

    
    const sendConfirmationEmail = (_id,newOrder)=>{
     //console.log("id "+_id + "email "+newOrder.customer.email)
      const url = `http://localhost:3001/api/email/confirmorder/${_id}`;

    post(url,{email:newOrder.customer.email,data:newOrder}).then((response)=>{
        console.log(response);
        setOrder([])
    })
  }

 
  
  const handleEmptyCart = async ()=>{

      emptyCart().then((response)=>{
         if (response.status===200){
           //console.log(response)
           setCart(response.data.cart)
           setItemsCount(response.data.cart.items.length);

         }
      })
  } 
  
  const refreshCart = async ()=>{
    const url=`http://localhost:3001/api/carts/refreshcart/${userid}`
    return axios.patch(url).then((response)=>{
      // eslint-disable-next-line no-cond-assign
      if(response.status=200){
       try{
        setCart(response.data.cart);
        setItemsCount(response.data.cart.items.length);

       }catch(err){
         console.log(err)
       }
      }
    });
  }
  const emptyCart = async () =>{

    const url = `http://localhost:3001/api/carts/${userid}`;
   
 
    return axios.patch(url)
  
  };
  const  handleRemoveFromCart = async (productId)=>{
  
       deleteFromCart(productId).then((response)=>{
         if (response.status===200){
           //console.log(response)
           setCart(response.data.cart)
           setItemsCount(response.data.cart.items.length);

         }
       })
  }
 

  const deleteFromCart =async (productId)=>{
    //console.log(productId)
    const url = `http://localhost:3001/api/carts/removeitem/${userid}`;
   
 
    return axios.patch(url,{
      productId:productId,
      userId:userid
    })
  
  };
  const handleUpdateCartQty = async (productId,quantity,price,shippingFees)=>{
          if (quantity>=1){
            updateCartQty(productId,quantity,price,shippingFees).then((response)=>{
              if (response.status===200){
               // console.log(response.data.cart.items)
                setCart(response.data.cart)
                setItemsCount(response.data.cart.items.length);

               } 
             })
          }
  }
  
  const updateCartQty =(productId,quantity,price,shippingFees)=>{
    console.log(shippingFees)
    const url = `http://localhost:3001/api/carts/quantity/${productId}`;
 
    return patch(url,  {
      productId:productId,
      quantity:quantity,
      price:price,
      shippingFees:shippingFees,
      userId:userid,
     
    })
  
  };

  const handleupdateColorSize = async (productId,type,value)=>{
  
    updateColorAndSizeSpecs(productId,type,value).then((response)=>{
        if (response.status===200){
         // console.log(response.data.cart.items)
          setCart(response.data.cart)
          setItemsCount(response.data.cart.items.length);

         } 
       })
    
   }
  const updateColorAndSizeSpecs =(productId,type,value)=>{
    
    const url = `http://localhost:3001/api/carts/specs/colorandsize`;
     
 
    return patch(url,  {
      productId:productId,
      type:type,
      value:value,
      userId:userid,
    })
  
  };

  const handleupdateSelection = async (productId,value)=>{
  
    updateSelection(productId,value).then((response)=>{
        if (response.status===200){
            try{
           // console.log(response.data.cart.items)
              setCart(response.data.cart)
              setItemsCount(response.data.cart.items.length);

            }catch(err){
              console.log(err)
            }
         } 
       })
    
   }
  const updateSelection =(productId,value)=>{
   // console.log(value)
    const url = `http://localhost:3001/api/carts/item/selection`;
     
 
    return patch(url,  {
      productId:productId,
      selected:value,
      userId:userid,
    })
  
  };
  const handleupdateMeasurement = async (productId,measurement)=>{
  
    updateMeasurement(productId,measurement).then((response)=>{
        if (response.status===200){
         // console.log(response.data.cart.items)
          setCart(response.data.cart)
          setItemsCount(response.data.cart.items.length);

         } 
       })
    
   }
  const updateMeasurement =(productId,measurement)=>{
    
    const url = `http://localhost:3001/api/carts/specs/measurement`;
     
 
    return patch(url,  {
      productId:productId,
      measurement:measurement,
      userId:userid,
    })
  
  };
  const handleAddtoCart = async (product,quantity)=>{
  /*   sendConfirmationEmail(userid,"abdulrazakneate@gmail.com") */

    addtoCart(product,quantity).then((response) => {
     // console.log(response.data);
      if (response.status===200){
        setCart(response.data.cart)
        setItemsCount(response.data.cart.items.length);

      }else{
       
      
      }
      //addToast(exampleToast(response.data.message));
    })
}

  const addtoCart =(product,quantity)=>{
    
    const url = 'http://localhost:3001/api/carts';
 
    return post(url,  {
      productId:product._id,
      quantity:quantity,
      product:product,
      userId:userid,
     
    })
  
  };


  const handleUpdateLikes = async (productId,storeId)=>{
     if(localStorage.getItem('loggedin')==='true'){//sign in user can like and add to fovorites
      updateLikes(productId,storeId).then((response) => {
       // console.log(response.data);
        if (response.status===200){
     
  
        }
      }) 
      }else{
        console.log('user not loggedin')
      }
  }
  
  
    
  
    const updateLikes =(productId,storeId)=>{
      
      const url = 'http://localhost:3001/api/productlikes/:productId';
   
      return post(url,  {
        productId:productId,
        storeId:storeId,
        email:user.email,
        
       
      })
    
    };

     
   
  const incomingOrder = async (newOrder)=>{
    //console.log(newOrder)
    let customer=newOrder.customer;
    let items=newOrder.line_items
    let shippingData=newOrder.shipping
    
    

    const url = 'http://localhost:3001/api/orders';
   var response='';
      for(let i=0;i<items.length;i++){
        if(items[i].selected){//make order fro only selected items

          await  post(url,  {
            name:items[i].product.name,
            storeId:items[i].product.storeId,
            productId:items[i].product._id,
            orderNumber:shippingData.orderNumber,
            orderType:items[i].product.product_type,
            quantity:items[i].quantity,
            color:items[i].color,
            size:items[i].size,
            measurement:items[i].measurement,
            filename:items[i].product.image[0].filename,
            priceEach:items[i].product.price,
            shippingFees:items[i].line_item_sub_fees,  
            totalPrice:items[i].line_item_sub_price,
            userId:userid,
            paymentMethod:"flutterwave",
            firstname:customer.firstname,
            lastname:customer.lastname,
            email:customer.email,
            phone:customer.phone,
            country:shippingData.country,
            state:shippingData.county_state,
            city:shippingData.town_city,
            street:shippingData.street,
            homeAddress:shippingData.home_address ,
          // eslint-disable-next-line no-loop-func
          },).then(ret=>{
            console.log(ret)
            response= ret;
          })
        }

      }

      return response
  


    
  }
 
  const handleCaptureCheckout =async (checkoutTokenId,newOrder)=>{
   
    try{ 
          incomingOrder(newOrder).then((response)=>{
          // console.log(response)
           setMyOrders(response.data.orders)
           setMyOrderCount(response.data.orders.length)
          
         })
         // console.log(newOrder)
          setOrder(newOrder);
          sendConfirmationEmail(userid,newOrder)
          //refreshCart();
    }catch(error){
      console.log(error.data.error.message)
    }
}
  
const handlegetProduct = async (productid)=>{
           
  fetchProduct(productid).then((response) => {
    //console.log(response.data);
    if (response.status===200){
       
      try{
        setProduct(response.data.product)
       
      }catch(err){
        console.log(err)
      }
    }
    //addToast(exampleToast(response.data.message));
  })

}




const fetchProduct =(productid)=>{

  const url = `http://localhost:3001/api/products/${productid}`;
  
  return axios.get(url)

};
const handlesearchByCategory = async (category)=>{
        
  searchProductByCategory(category).then((response) => {
   //console.log(response.data);
   if (response.status===200){
      
     try{
       setFilteredProducts(response.data.products)
      
     }catch(err){
       console.log(err)
     }
   }
   //addToast(exampleToast(response.data.message));
 })

}




const searchProductByCategory =(category)=>{

 const url = `http://localhost:3001/api/products/category/${category}`;
 
 return axios.get(url)

};

const handlesearchProduct = async (searchString)=>{
   searchString !==''?        
  searchProduct(searchString).then((response) => {
    //console.log(response.data);
    if (response.status===200){
       
      try{
        setFilteredProducts(response.data.products)
       
      }catch(err){
        console.log(err)
      }
    }
    //addToast(exampleToast(response.data.message));
  }): setFilteredProducts([])

}




const searchProduct =(searchString)=>{

  const url = `http://localhost:3001/api/products/find/${searchString}`;
  
  return axios.get(url)

};

   useEffect(() => {
     
    
    ref.current.ownerDocument.body.scrollTop = 0;
    

     
    const fetchProducts = async ()=>{
      try{
         const res  = await fetch(`http://localhost:3001/api/products`);
         const data = await res.json();
              // console.log(data);
               return data;
      }catch(error){
  
      }
  }

  const getFavorites =async() => {

    const url = `http://localhost:3001/api/productlikes/${user.email}`;
    
    return axios.get(url).then((response)=>{
       try{
         if (response.status===200){
           //console.log(response.data)
           let d=response.data.favoritesProducts;
           let favs =[];
          for(let i=0;i<d.length;i++){
            favs.push(d[i].productId);
            
          }
       setFovirites(favs);
         }

       }catch(err){
          console.log(err)
       }
    })
   
  }
    const fetchFavorites = async ()=>{
      try{
         const res  = await fetch(`http://localhost:3001/api/productlikes/${user.email}`);
         const data = await res.json();
              // console.log("favorites "+data);
               return data;
      }catch(error){
  
      }
  }

  const getProducts =async() => {
    try{
       const productsFromServer = await fetchProducts();
       let tmp =[];
          for(let i=0;i<productsFromServer.length;i++){
            tmp.push(productsFromServer[i]);
            
          }
       setProducts(tmp);
       //console.log(tmp);
    }catch(error){
  
    }
  } 

  
  const handlegetCart = async ()=>{
  // console.log("get cart"+userid)
  
    getCart().then((response) => {
      //console.log(response.data);
      if (response.status===200){
        try{
          setCart(response.data.cart)
          setItemsCount(response.data.cart.items.length);
        }catch(err){
          console.log(err)
        }
      }
      //addToast(exampleToast(response.data.message));
    })
  
}


  

  const getCart =()=>{

    const url = `http://localhost:3001/api/carts/${userid}`;
    
    return axios.get(url)
  
  };

  const getOrders =()=>{

    const url = `http://localhost:3001/api/orders/user/${userid}`;
    
    return axios.get(url).then((response)=>{
       try{
         if (response.status===200){
           setMyOrders(response.data.orders)
           setMyOrderCount(response.data.orders.length)
         }

       }catch(err){
          console.log(err)
       }
    })
  
  };

  const getCategories =()=>{

    const url = `http://localhost:3001/api/category`;
    
    return axios.get(url).then((response)=>{
       try{
         if (response.status===200){
           //console.log(response.data)
           setCategories(response.data)
         }

       }catch(err){
          console.log(err)
       }
    })
  } 
   
    if (!history.location.pathname.includes('dashboard')){
      getCategories()
      getProducts();
      handlegetCart();
      getOrders();
    }
    

   },[userid,user,history])

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ pb: 0 }} ref={ref} className='boxMain'>
    
      <CssBaseline />
       
         <Route exact path={paths}>
           <TopbarcontacInfo/>
           
         <Topbar totalItems={itemsCount} totalOrders={orderCount} handlesearchProduct={handlesearchProduct} handleUserClick={handleUserClick}/>
        {/*  <Appbar totalItems={itemsCount} totalOrders={orderCount} handlesearchProduct={handlesearchProduct} handleUserClick={handleUserClick}/> */}
         </Route>
         <RModal openModal={openModal} handleCloseModal={handleCloseModal} ref={ref}/>

       <Switch>         
       <Route exact path="/">  
       {filteredProducts.length > 0 ? '':<CategoryWidget categories={categories} handlesearchByCategory={handlesearchByCategory}/> }
      {filteredProducts.length > 0 ? <Products products={filteredProducts}  onAddToCart={handleAddtoCart} onUpdateLikes={handleUpdateLikes} favorites={favorites}/>:<Products products={products}  onAddToCart={handleAddtoCart} onUpdateLikes={handleUpdateLikes} favorites={favorites}/>}
       </Route>
       <Route exact path="/cart">
          <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleupdateColorSize={handleupdateColorSize} handleupdateMeasurement={handleupdateMeasurement} handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart} handleupdateSelection={handleupdateSelection}/>
       </Route>
       <Route exact path="/checkout">
         <CheckOut cart={cart}   order={order}  onCaptureCheckout={handleCaptureCheckout}/>
       </Route>
        <Route exact path="/orders">
        <Orders orders={myOrders}/>
         </Route>
        <Route exact path="/proceedcheckout">
          <ProceedCheckOut onAddToCart={handleAddtoCart}/>
        </Route>
        <Route exact path='/prefaredstylecheckout' >
         <PrefaredStyleCheckOut onAddToCart={handleAddtoCart}/>
        </Route>
         <Route path="/login">
           <LogIn/>
         </Route>
          <Route path="/signup">
           <SignUp/>
         </Route>
         <Route path="/account">
           <Account/>
         </Route>
          <Route path="/aboutus">
          <AboutUs/>
       </Route>
         <Route path="/dashboard">
            <Dashboard/>
         </Route>
       </Switch>
       <Route exact path={paths}>
       <BottomNav onBottomNavChange={handleOnchange}  totalItems={itemsCount} orderItems={orderCount}/>
         </Route>
         <Route exact path={['/']}>
           <Footer/>
         </Route>
     </Box>
     </ThemeProvider>
  );
}

export default App;
