import {useEffect} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {userData} from "../../dummyData";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
function Home({user,transactions,handlegetStores,isStoresLoaded,setIsStoreLoaded,handlegetProducts , completedAggregate, inCompletedAggregate, alltimeAggregate, monthlySales}) {


  useEffect(() => {
    
     if(user){
        if (!isStoresLoaded){
          handlegetStores(user); 
          handlegetProducts()
        }

        return ()=>{
          setIsStoreLoaded(true)
        }
    }
      
    },[handlegetProducts, handlegetStores, isStoresLoaded, setIsStoreLoaded, user]);
    return (
        <div className="home">
         <div className="widgetwrapper">
                <FeaturedInfo completedAggregate={completedAggregate} inCompletedAggregate={inCompletedAggregate} alltimeAggregate={alltimeAggregate} monthlySales={monthlySales}/>
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
