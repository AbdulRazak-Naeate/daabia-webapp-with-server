import React from 'react'
import './widgetSm.css';
import {useHistory} from 'react-router-dom';
import {Visibility } from '@material-ui/icons';

function WidgetSm({products}) {
  const history=useHistory();
  const handleEdit = (product)=>{
    //navigate to product page
   history.push(`/dashboard/product?productId=${product._id}&productName=${product.name}`);
   localStorage.setItem('product', JSON.stringify(product));        

}
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Products</span>
            <ul className="widgetSmList">
               {
                 products.map((product,index)=>{
                   return( <li className="widgetSmListItem" key={index}>
                   <img src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}/server/uploads/products/${product.image[0].filename}`} alt="" className="widgetSmImg" />
                 <div className="widgetSmProduct">
                     <span className="widgetSmProductTitle">{product.name}</span>
                     {/* <span className="widgetSmProductDescription">{product.desscription}</span> */}
                 </div>
             
               <button className="widgetSmButton" onClick={()=>{handleEdit(product)}}>
                   <Visibility className="widgetSmIcon"/>
                   {/* Display */}
                 </button>
            
               </li>)
                 })
               }
               
            </ul>
        </div>
    )
}

export default WidgetSm
