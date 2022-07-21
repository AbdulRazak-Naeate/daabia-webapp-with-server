/* eslint-disable no-unused-vars */
import React from 'react';
import {useHistory} from 'react-router-dom'
import "./featuredInfo.css";
import {Grid} from '@mui/material';
import { ArrowDownward,ArrowUpward,Add} from "@material-ui/icons"
import { formatWithCurrencySymbol,formarttoCurrency } from "../../../utils/Utils"

export const FeaturedInfo = ({completedAggregate,inCompletedAggregate,alltimeAggregate}) => {

    const history = useHistory()
   
   var completeCount=0;
   var completeSales=0
   var inCompleteCount=0;
   var inCompleteAmount=0
   var alltimeCount=0;
   var alltimeSales=0;
   var newOrders=0;
   try{
    //console.log(completedAggregate[0].total)
     completeCount = completedAggregate[0].count
     completeSales = completedAggregate[0].total

     inCompleteCount = inCompletedAggregate[0].count
     inCompleteAmount = inCompletedAggregate[0].total


     alltimeCount=alltimeAggregate[0].count
     alltimeSales=alltimeAggregate[0].total

   }catch(err){
       console.log(err)
   }
   const onFeatureItemOnclik =(address)=>{
       history.push(`/dashboard/${address}`)
   }
   const Featured =({completeCount,completeSales})=>(
    <div className="featured">
    <Grid container justifyContent='space-between' xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
                <div className="featuredItem" onClick={()=>{onFeatureItemOnclik('transactions')}}>
    <span className="featureTitle">In Progress</span>
     <div className="featuredMoneyContainer">
         <span className="featuredMoney">{inCompleteCount}</span>
         <span className="featuredMoneyRate">
         <Add  className="featuredIcon positive"/>
         </span>
     </div>
     <span className="featuredSub">Current orders</span>
    </div>   
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
                  <div className="featuredItem"  onClick={()=>{onFeatureItemOnclik('sales')}}>
    <span className="featureTitle">Completed</span>
     <div className="featuredMoneyContainer">
         <span className="featuredMoney">{completeCount}</span>
         <span className="featuredMoneyRate">
         <Add  className="featuredIcon positive"/>
         </span>
     </div>
     <span className="featuredSub">Completed orders</span>
    </div>
                 
                 
    </Grid>

    <Grid item xs={12} sm={12} md={3} lg={3}>
         <div className="featuredItem">
    <span className="featureTitle">All time Orders</span>
     <div className="featuredMoneyContainer">
         <span className="featuredMoney">{alltimeCount}</span>
         <span className="featuredMoneyRate">
         <Add  className="featuredIcon positive"/>
         </span>
     </div>
     <span className="featuredSub">All times orders</span>
    </div>         
      </Grid>

      <Grid item xs={12} sm={12} md={3} lg={3}>
            
    <div className="featuredItem">
    <span className="featureTitle">Sales</span>
     <div className="featuredMoneyContainer">
         <span className="featuredMoney">{`${formarttoCurrency(completeSales,'π')}`}</span>
         <span className="featuredMoneyRate">-11.4
         <ArrowDownward className="featuredIcon negative"/>
         </span>
     </div>
     <span className="featuredSub">All time sales made</span>
    </div>     
     </Grid>
    </Grid>


  

   

  {/*   <div className="featuredItem">
    <span className="featureTitle">Cost</span>
     <div className="featuredMoneyContainer">
         <span className="featuredMoney">$4,415</span>
         <span className="featuredMoneyRate">+2.4
         <ArrowUpward  className="featuredIcon"/>
         </span>
     </div>
     <span className="featuredSub">Compared to last month</span>
    </div> */}
 </div>
   )
    return (
       <>
      { 
          alltimeAggregate.length > 0 ? <Featured completeCount={completeCount} completeSales={completeSales}/>:<Featured completeCount={0} completeSales={0}/>
       }
       </>
    )
}
