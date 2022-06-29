import {useEffect} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import Widgetsm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
function Home({user,transactions,handlegetStores,isStoresLoaded,setIsStoreLoaded,isProductsLoaded,setIsProductsLoaded,handlegetProducts , completedAggregate, inCompletedAggregate, alltimeAggregate, monthlySales,productxs}) {

  useEffect(() => {
    
     if(user){
        if (!isStoresLoaded){
          handlegetStores(user); 
        //  handlegetProducts();
        }

        return ()=>{
          setIsStoreLoaded(true)
        }
    }
      
    },[handlegetProducts, handlegetStores, isStoresLoaded, setIsProductsLoaded, setIsStoreLoaded, user]);
    return (
        <div className="home">
         <div className="widgetwrapper">
                <FeaturedInfo completedAggregate={completedAggregate} inCompletedAggregate={inCompletedAggregate} alltimeAggregate={alltimeAggregate} monthlySales={monthlySales}/>
                {monthlySales ?  <Chart data={monthlySales} title="Sales Analytics" grid datakey={"Monthly Sales"}/>:''}
          <div className="homeWidgets"> 
           <Widgetsm products={productxs}/>
           <WidgetLg transactions={transactions}/>
          </div>
         </div>
        </div> 
    )
}

export default  Home
