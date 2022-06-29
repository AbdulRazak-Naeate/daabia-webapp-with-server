import { useState,useEffect } from "react";
import React from 'react';
import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import Confirm from "./components/email/Confirm"
import "./dashboard.css"
import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Store from "./pages/store/Store"
import StoreList from "./pages/storeList/StoreList";
import NewStore from "./pages/newStore/NewStore";
import ProductsList from "./pages/productlist/ProductsList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Transactions from "./pages/transactions/Transactions";
import Sales from './pages/sales/Sales';
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import axios from 'axios';

 function  Dashboard() {
 const [showSidebar,setShowSideBar]=useState(true);
 const [stores, setStores] = useState(JSON.parse(localStorage.getItem('stores')));
 const [storeindex,setStoreindex]=useState(parseInt(localStorage.getItem('storeindex')));
 const user = JSON.parse(localStorage.getItem('user'));
 const [products,setProducts]=useState([]);
 const [productxs,set_Products]=useState([]);
 const [transactions,setTransactions]=useState([]);
 const [sales,setSales]=useState([]);
 const [completedAggregate,setCompletedAggregate]=useState([]);
 const [inCompletedAggregate,setinCompletedAggregate]=useState([]);
 const [alltimeAggregate,setAlltimeAggregate]=useState([]);
 const [analyticsLoaded,setIsanalyticsLoaded]=useState(false);
 const [monthlySales,setMonthlySales]=useState([]);
 const [ismonthlySalesLoaded,setIsmonthlySalesLoaded]=useState(false);
 const [isStoresLoaded,setIsStoreLoaded]=useState(false);
 const [isTransLoaded,setIstransLoaded]=useState(false);
 const [isSalesLoaded,setIsSalesLoaded]=useState(false);
 const [isproductsLoaded,setIsproductsLoaded]=useState(false);
 const [_isProductsLoaded,_setIsproductsLoaded]=useState(false)

 const handletoggleSideBar=(bol)=>{
   setShowSideBar(bol);
 }
  const toggleSideBar=()=>{
    setShowSideBar(!showSidebar);
  }
  const handleOnStoreChange =(e)=>{
    console.log(e.target.value)
    setIstransLoaded(false);
    setIsSalesLoaded(false);
    setIsproductsLoaded(false);
    setIsanalyticsLoaded(false);
    _setIsproductsLoaded(false)
    setStoreindex(e.target.value)
    localStorage.setItem('storeindex',e.target.value)
  }
  const paths =[ 
    '/dashboard',
    '/dashboard/users',
    '/dashboard/user/:userId',
    '/dashboard/newUser/',
    '/dashboard/store',
    '/dashboard/stores',
    '/dashboard/store/:storeId',
    '/dashboard/newStore/',
    '/dashboard/products',
    '/dashboard/product',
    '/dashboard/newProduct',
    '/dashboard/transactions',
    '/dashboard/sales',]


    async function deleteStore(_id) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/stores/${_id}`);
        console.log(response);
        if (response.data.deletedCount>=1){
        setStores(stores.filter((item) => item._id !==_id))

        }
      } catch (error) {
        console.error(error);
      }
    }
    async function handleDeleteProduct(_id) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/products/${_id}`);
        console.log(response);
        if (response.data.deletedCount>=1){
        setProducts(products.filter((item) => item._id !==_id))

        }
      } catch (error) {
        console.error(error);
      }
    }
//Transactions
const handleUpdateTransaction=(orderid,status,setSelectionModel)=>{
     
  editTransaction(orderid,status).then((response)=>{

    const data=response.data.data;
    setTransactions(data)//set transaction data  with new updated one 
    setSelectionModel([]);
    //console.log(response.data);
    
  });
}

const editTransaction =(orderid,status)=>{
const url = `http://localhost:3001/api/orders/${orderid}`;
const user = JSON.parse(localStorage.getItem('user'));

const body={
       status:status,
       storeId:stores[storeindex]._id
    
}
const config = {
  headers: {
      'auth-token':
        user.auth_token,
    },
}
return axios.patch(url, body,config)

};


const handleUpdateManyTransactions=(option,setSelectionModel,selected_Ids)=>{


editTransactions(option,selected_Ids).then((response)=>{            

    if(response.status===200){
     setTransactions(response.data.data);
     setSelectionModel([])
    }                   

});
}

const editTransactions =(option,selected_Ids)=>{
const ids=JSON.stringify(selected_Ids);
const url = `http://localhost:3001/api/orders/many/${ids}`;
const user = JSON.parse(localStorage.getItem('user'));


const body={
     storeId:stores[storeindex],
     status:option,
     ids: ids
  
}
const config = {
headers: {
    'auth-token':
      user.auth_token,
  },
}
return axios.patch(url, body,config)

};
//Sales Start here
// eslint-disable-next-line no-unused-vars
const handleUpdateSales=(orderid,setSelectionModel)=>{
     
  editSales(orderid).then((response)=>{

    const data=response.data.data;
    setSales(data)//set transaction data  with new updated one 
    setSelectionModel([]);
    //console.log(response.data);
    
  });
}

const editSales =(orderid,status)=>{
const url = `http://localhost:3001/api/orders/${orderid}`;
const user = JSON.parse(localStorage.getItem('user'));

const body={
       status:status,
       storeId:stores[storeindex]._id
    
}
const config = {
  headers: {
      'auth-token':
        user.auth_token,
    },
}
return axios.patch(url, body,config)

};


// eslint-disable-next-line no-unused-vars
const handleUpdateManySales=(option,setSelectionModel)=>{


editsales(option).then((response)=>{            

    if(response.status===200){
     setSales(response.data.data);
     setSelectionModel([])
    }                   

});
}

const editsales =(option,selected_Ids)=>{
const ids=JSON.stringify(selected_Ids);
const url = `http://localhost:3001/api/orders/many/${ids}`;

const body={
     storeId:stores[storeindex]._id,
     status:option,
     ids: ids
  
}
const config = {
headers: {
    'auth-token':
      user.auth_token,
  },
}
return axios.patch(url, body,config)

};

   //New Products Here

   const onFormSubmit = (e,clearFields,Alert,colors,sizes,name,price,categoryId,description,specification,digitalProductUrl,storeid,stock,active,productImages) => {
       
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    
    
    e.preventDefault()// Stop form default submit
    
        initiateAndCreateProduct(colors,sizes,name,price,categoryId,description,specification,digitalProductUrl,storeid,stock,active,productImages).then((response) => {
          console.log(response.data);
         if (response.data.status===200){
          //window.location.reload();
           
            clearFields();
         }else if (response.data.status===400){ 

          Alert.error(response.data.message, {
            position: 'top-right',
            effect: 'jelly'

        });
       // history.go(0);
         }
        });
       
  }
 const initiateAndCreateProduct =(colors,sizes,name,price,categoryId,description,specification,digitalProductUrl,storeid,stock,active,productImages)=>{
    
    const url = 'http://localhost:3001/api/products/';

    console.log(colors);
    const formData = new FormData();
    //getInput values
   // let colors = getInputValues('color-specs');
    //let sizes  = getInputValues('size-specs');

    for (let i = 0; i < colors.length; i++) {
       if(colors[i]!==""){
        formData.append('color', colors[i]);
       }
    }
    for (let j = 0; j < sizes.length; j++) {
      if (sizes[j]!==""){
        formData.append('size', sizes[j]);
      }
    }
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category',categoryId);
    formData.append('description', description);
    formData.append('specification', specification);
    formData.append('digital_product_url', digitalProductUrl);//append digital
    formData.append('storeId', storeid);
    formData.append('stock',stock);
    formData.append('active',active)
    console.log(JSON.stringify(formData));
 
    //append files to image to create an a file array
  
    for (var i = 0; i <= productImages.length; i++) {
      formData.append('image', productImages[i]);
      //console.log(productImages);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token':
          user.auth_token,
      },
    }
    return axios.post(url, formData, config)
  
  };

   //Products start here
    const fetchProducts = async ()=>{
      try{
         const res = await fetch(`http://localhost:3001/api/products/store/${stores[storeindex]._id}`);
         const data=await res.json();
               console.log(data);
               return data.products;
      }catch(error){

      }
}
const handlegetProducts = async ()=> {

    try{
       const productsFromServer = await fetchProducts();
       console.log(productsFromServer);
       
       let tmp =[];
          for(let i=0;i<productsFromServer.length;i++){
            tmp.push(productsFromServer[i]);
            
          }
       setProducts(tmp);
       console.log(tmp);
    }catch(error){

    }
}

const fetchStores = async(user)=>{
  try{
    
           const url =`http://localhost:3001/api/stores/user/${user._id}`;
      
           return  axios.get(url);
           
  }catch(error){

  }
}
const handlegetStores = async(user) => {
try{
    fetchStores(user).then((response)=>{
      console.log(response)
      setStores(response.data.store);  

      localStorage.setItem('stores',JSON.stringify(response.data.store))

    });
 
}catch(error){

}
}

const fetchTransactions = async (stores) => {//get Orders 
  
  try {
   
    
   if (stores){
    const res = await fetch(`http://localhost:3001/api/orders/${stores[storeindex]._id}`);

       const data = await res.json();
       console.log(data)
       return data.orders;
   }
 

 } catch (error) {
 console.log({fetch_store_message:error})
 }
}

const handlegetTransactions = async (stores) => {

 try {
 const ordersFromServer = await fetchTransactions(stores);  
  let tmp =[];
  for(let i=0;i<ordersFromServer.length;i++){
    tmp.push(ordersFromServer[i]);
    
  } 
  handlegetProducts()
   setTransactions(tmp)

} catch (error) {
  //setStoreId(stores[0]._id);
  console.log({message:error})
}
};

const fetchSales= async (stores) => {//get Orders 
  
  try {
  
    
 const res = await fetch(`http://localhost:3001/api/orders/completed/${stores[storeindex]._id}`);
 const data = await res.json();
 
 return data.orders;

 } catch (error) {
 console.log({fetch_sales_message:error})
 }
}

const handlegetSales = async (stores) => {

 try {
 const ordersFromServer = await fetchSales(stores);  
  let tmp =[];
  for(let i=0;i<ordersFromServer.length;i++){
    tmp.push(ordersFromServer[i]);
    
  }
   setSales(tmp)

} catch (error) {
  //setStoreId(stores[0]._id);
  console.log({message:error})
}
};
 useEffect(()=>{ 
  const fetchProducts = async ()=>{
    try{
       const res = await fetch(`http://localhost:3001/api/products/store/${stores[storeindex]._id}`);
       const data=await res.json();
             console.log(data);
             return data.products;
    }catch(error){

    }
}
const handleget_Products = async ()=> {

  try{
     const productsFromServer = await fetchProducts();
     console.log(productsFromServer);
     
     let tmp =[];
        for(let i=0;i<productsFromServer.length;i++){
          tmp.push(productsFromServer[i]);
          
        }
     set_Products(tmp);
     console.log(tmp);
  }catch(error){

  }
}
  const handlegetMonthAnalytics =  async (storeid) => {//get Orders 
 
    var url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/analytics/sales/monthly/${storeid}`
  
    await axios.post(url,{year:2022}).then((response)=>{
      //console.log(response.data)
          setMonthlySales(response.data.monthlySales);
         
  
   });
  }
  const handlegetAnalytics =  async (storeid) => {//get Orders 
 
    var url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/analytics/report/${storeid}`

    await axios.get(url).then((response)=>{
     // console.log(response.data.transactions)
          //setAnalytics(response.data);
          setTransactions(response.data.transactions);
          setCompletedAggregate(response.data.completedAggregate);
          setinCompletedAggregate(response.data.inCompleteAggregate);
          setAlltimeAggregate(response.data.alltimeAggregate);

   });
 }
 if (!ismonthlySalesLoaded){ handlegetMonthAnalytics(stores[storeindex]._id);}
 if (!analyticsLoaded){ handlegetAnalytics(stores[storeindex]._id);}
  if (!_isProductsLoaded){
    handleget_Products()
  }
return ()=>{
  
     setIsanalyticsLoaded(true);
     setIsmonthlySalesLoaded(true);
     setIsproductsLoaded(true);
     
}
},[_isProductsLoaded, analyticsLoaded, ismonthlySalesLoaded, isproductsLoaded, storeindex, stores]);
 
  return (
    <Router>
    <Route exact path={paths}>
         <Topbar/>
         </Route>
     <div className="content">

    <div>
       {showSidebar &&
       <Route exact path={paths}> <Sidebar stores={stores} storeindex={storeindex} handleOnStoreChange={handleOnStoreChange}/></Route>
        } 
    </div>
   
      <Route exact path={paths}>
        <div className="toggleSidebarButton" onClick={toggleSideBar}></div>
      </Route>
     
    
     <Switch>
     <Route exact  path="/dashboard">
         <Home user={user} stores={stores} transactions={transactions} setStores={setStores} handlegetStores={handlegetStores} handlegetProducts={handlegetProducts} isStoresLoaded={isStoresLoaded}setIsStoreLoaded={setIsStoreLoaded} completedAggregate={completedAggregate} inCompletedAggregate={inCompletedAggregate} alltimeAggregate={alltimeAggregate} monthlySales={monthlySales} productxs={productxs}/>
       </Route>
       <Route path="/dashboard/users">
        <UserList/>
       </Route>
       <Route path="/dashboard/user/:userId">
        <User/>
       </Route>
       <Route path="/dashboard/newUser/">
        <NewUser/>
       </Route>
       <Route path="/dashboard/store">
         <Store/>
         </Route>

       <Route path="/dashboard/stores">
        <StoreList  stores={stores} setStores={setStores} handlegetStores={handlegetStores}  onDeleteStore={deleteStore}/>
       </Route>
       <Route path="/dashboard/store/:storeId">
       
       </Route>

       <Route path="/dashboard/newStore/">
        <NewStore stores={stores} setStores={setStores}/>
       </Route>

       <Route path="/dashboard/products">
        <ProductsList products={products} handlegetProducts={handlegetProducts} handleDeleteProduct={handleDeleteProduct} isproductsLoaded={isproductsLoaded}setIsproductsLoaded={setIsproductsLoaded} store={stores[storeindex]}/>
       </Route>
       <Route path="/dashboard/product">
        <Product/>
       </Route>

       <Route path="/dashboard/newProduct">
        <NewProduct store={stores[storeindex]} onFormSubmit={onFormSubmit}/>
       </Route>

       <Route path="/dashboard/transactions">
        <Transactions transactions={transactions} isTransLoaded={isTransLoaded} setIstransLoaded={setIstransLoaded} handlegetTransactions= {handlegetTransactions} handlegetStores={handlegetStores} handleUpdateManyTransactions={handleUpdateManyTransactions} handleUpdateTransaction={handleUpdateTransaction}/>
       </Route>
       <Route path="/dashboard/sales">
        <Sales sales={sales} setSales={setSales} stores={stores} handlegetSales={handlegetSales} isSalesLoaded={isSalesLoaded}setIsSalesLoaded={setIsSalesLoaded}/>
       </Route>
       <Route path="/dashboard/login" >
         <LogIn toggleSideBar={handletoggleSideBar}/>
       </Route>
       <Route path="/dashboard/signup">
         <SignUp  toggleSideBar={handletoggleSideBar} />
       </Route>
       <Route path="/dashboard/email/confirm">
         <Confirm/>
       </Route>
     </Switch>
    
    </div>
    </Router>
  )
}

export default Dashboard