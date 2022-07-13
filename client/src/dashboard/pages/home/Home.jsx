import {useEffect} from 'react';
import { Chart } from "../../components/charts/Chart";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import {Grid} from '@mui/material'
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
          <Grid container xs={12} sm={12} md={12} lg={12}>
                 <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Widgetsm products={productxs}/>
                 </Grid> 
                 <Grid item xs={12} sm={12} md={6} lg={6}>
                   <WidgetLg transactions={transactions}/>
                 </Grid>
           </Grid>
          
          </div>
         </div>
        </div> 
    )
}

export default  Home
