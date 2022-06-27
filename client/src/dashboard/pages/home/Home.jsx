import {useEffect} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
function Home({user,transactions,handlegetStores,isStoresLoaded,setIsStoreLoaded}) {


 
 //handlegetStores(user);
 useEffect(() => {
    
     if(user){
        if (!isStoresLoaded){
          handlegetStores(user); 

        }

        return ()=>{
          setIsStoreLoaded(true)
        }
    }
      
    },[handlegetStores, isStoresLoaded, setIsStoreLoaded, user]);
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
