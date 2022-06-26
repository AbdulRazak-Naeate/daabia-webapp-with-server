import {useEffect,useState} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from 'axios';
function Home({setStores,handlegetStores,handlegetProducts,isStoresLoaded,setIsStoreLoaded}) {

  const [transactions,setTransactions]=useState([]); 
  const [storesTransactions,setStoresTransactions]=useState([]); 
  const [storeIds,setStoreIds]=useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
 console.log('home');
 //handlegetStores(user);
 useEffect(() => {
     //handlegetProducts('617830f1391d5d0cd0c7af41');

    console.log('d');

   
      const fetchTransactions =  async (stores) => {//get Orders 
 
           var url = `http://localhost:3001/api/analytics/transactions/${stores[0]._id}`
  
          const response = await axios.get(url).then((response)=>{
                          setTransactions(response.data.transactions);
                          fetchStoresTransactions(stores)

          });
        }

        const fetchStoresTransactions =  async (stores) => {//get Orders 

          const ids=[];
          for(let i=0;i<stores.length;i++){
            ids.push({id:stores[i]._id,name:stores[i].name});
          }
          
           console.log(ids);
           const sids=JSON.stringify(ids)
           
          var url = `http://localhost:3001/api/analytics/transactions/many/ids`
          var body={
            storeIds:sids,
          }
          console.log(body);
               const response = await axios.post(url,body);
               setStoresTransactions(response.data.transactions);
       }
    /* const handlegetTransactions =  (stores) => {
      
       try {
        fetchTransactions(stores).then((response)=>{
                setTransactions(response.data.transactions)
  
       });  
      
      } catch (error) {
        //setStoreId(stores[0]._id);
        console.log({message:error})
      }
      }; */
     if(user){
        if (!isStoresLoaded){
          handlegetStores(user); 

        }

        return ()=>{
          setIsStoreLoaded(true)
        }
    }
    
     //handlegetTransactions(stores)
  
    },[handlegetProducts, handlegetStores, isStoresLoaded, setIsStoreLoaded, setStores, user]);
    return (
        <div className="home">
         <div className="widgetwrapper">
                <FeaturedInfo/>
            <Chart data={userData} title="User Analytics" grid datakey={"Active User"}/>
          <div className="homeWidgets"> 
           <Widgetsm/>
           <WidgetLg transactions={transactions}/>
          </div>
         </div>
        </div> 
    )
}

export default  Home
