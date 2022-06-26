import React from 'react'
import {Grid} from '@mui/material'
import './index.css'

const CategoryWidgets= ({handlesearchByCategory,categories}) => {



  const CategoryWidget = ({item,onHandlegetCatgeryProducts})=>(
      <div className="categoryItem" onClick={()=>{onHandlegetCatgeryProducts(item.short_code)}}>
      <span className="categoryItemTitle">{item.name}</span>
       <div className="categoryItemContent">
           <span className="categoryProducts">{item.products}</span>
           <span className="categoryMoneyRate">-11.4
           </span>
       </div>
      </div>

  )
  return (
   <div className="category">
      <Grid container justifyContent="space-between" spacing={1} >
       {
         categories.map((item,index)=>(
           <Grid item={true} key={index} xs={6} sm={6} md={4} lg={4}>
              <CategoryWidget index={index} item={item} onHandlegetCatgeryProducts={handlesearchByCategory}/>
           </Grid>
         ))
       }
    </Grid>
   </div>
  )
}

export default CategoryWidgets
