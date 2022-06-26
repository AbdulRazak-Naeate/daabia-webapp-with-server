import {useEffect, useState} from 'react'
import './product.css';
import {Link} from "react-router-dom";
import {Button} from '@mui/material';
import { Chart } from '../../components/charts/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import QueryParams from '../../QueryParams';
import {patch}from 'axios';

  const MesurementItem = ({itemval,index,name,onUpdateColors})=>{
          const [val,setValue]=useState(itemval);
       return( <input type="text" className={`measurementItem ${name}`} placeholder="" value={val} key={index} onChange={(e)=>{setValue(e.target.value);onUpdateColors(name)}}  id={`${name}${index}`}/>)
      }

      const SizeMesurementItem = ({itemval,index,name,onUpdateSizes})=>{
        const [sval,setsValue]=useState(itemval);
     return( <input type="text" className={`measurementItem ${name}`} placeholder="" value={sval} key={index} onChange={(e)=>{setsValue(e.target.value);onUpdateSizes(name)}}  id={`${name}${index}`}/>)
    }

export default function Product() {
    const query=QueryParams();
    const [product,setProduct]= useState(JSON.parse(localStorage.getItem('product')));
    const [storeid]=useState(query.get('storeId'));
    const [storename]=useState(query.get('storeName'));
    const [productid]=useState(product._id); 
    const [productname]=useState(product.name);
    const [colors,setColors]=useState(product.color);
    const [sizes,setSizes]=useState(product.size);
    console.log(product.color);
    // eslint-disable-next-line no-unused-vars
    const [stock,setStock]=useState(product.stock.currentstock);
    const [addStock,setaddStock]=useState(0);
    const [active,setActive]=useState(product.active);
    const [price,setPrice]=useState(product.price);
    const [productUpdated,setProductUpdated]=useState(false);
    const[user]=useState(JSON.parse(localStorage.getItem('user')));
       
      const removeLastIndex = (values) => {
          let arr=[...values];
           arr.pop(values.length-1);
           console.log(values);
        return arr;
      }

      const getValues =(classname)=>{
          let values =[];
        let elems =  document.getElementsByClassName(classname);
           for(let i=0;i<elems.length;i++){
                 if (elems[i].value!==""){
                    values.push(elems[i].value)
                    console.log(elems[i].value)
                 }
               
             
           }
           return values;
      }
      const handleUpdate=(e)=>{
            e.preventDefault();
            editProduct().then((response)=>{
                if(response.status===200){
                     setProduct(response.data)
                     setStock(response.data.stock.currentstock);
                     setPrice(response.data.price);
                     setActive(response.data.active);
                     setColors(response.data.color);
                     setSizes(response.data.size);
                     console.log(response);              
                     setProductUpdated(!productUpdated)
}                    setaddStock(0);
               

            });
      }

      const editProduct =()=>{
        const url = `http://localhost:3001/api/products/${productid}`;
        const colval=getValues('color');
        console.log(colval);
        const sizeval=getValues('size');
        const body={
                 productId:productid,
                 price:price,
                 stock:addStock,
                 active:active,
                 color:colors,
                 size:sizes,
                 
        }
        const config = {
            headers: {
                'auth-token':
                  user.auth_token,
              },
        }
        return patch(url, body,config)
      
      };
      const onUpdateColors =(name)=>{
         setColors(getValues(name));
      }
      const onUpdateSizes =(name)=>{
        setSizes(getValues(name));
     }
    

      
      
      useEffect(()=>{
         //var addStockput = document.getElementById('stock');
        // addStockput.innerText=product.stock;
      })
    return (
        <div className="product">
            <span>{storename}</span>
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                 <div style={{width:'25%',display:'flex',justifyContent:'space-between'}}>
                 <Link to={`/dashboard/newproduct?storeId=${storeid}&storeName=${storename}`}>
                <button className="productAddButon">Create</button>
                </Link>
                <Link to={`/dashboard/products?storeId=${storeid}&storeName=${storename}`}>
                <button className="productAddButon">Products</button>
                </Link>
                 </div>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} datakey="Sales" title="Sales Performance"/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} alt="" className="productInfoImg" />
                       <span className="productName">{productname}</span>
                    </div>
                    <div className="productInfoBottom">
                        <span className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue">{" "+product._id}</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">sales</span>
                            <span className="productInfoValue">5123</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">active</span>
                            <span className="productInfoValue">{active}</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <label className="productInfoValue" >{product.stock.currentstock}</label>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">price:</span>
                            <label className="productInfoValue" id="stock">{`π${product.price}`}</label>
                        </span>
                    </div>
                    </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleUpdate}>
                    <div className="productFormLeft">
                       <div className='formItem'>
                       <label>Product Name</label>
                        <input type="text" value={product.name}placeholder="Apple Airpod"/>
                      
                       </div>
                       <div className='formItem'>
                         <label>Price</label>
                        <input type="text" placeholder="π10.00"value={price}onChange={(e)=>{setPrice(e.target.value)}}/>
                       </div>
                       <div className='formItem'>
                        <label>Add Stock</label>
                        <input type="text" id="stock" value={addStock}   placeholder="0" onChange={(e)=>{setaddStock(e.target.value)}}/>
                        </div>
                        <div className='formItem'>
                        <label>Active</label>
                        <select name="active" id="" className="active" onChange={(e)=>{setActive(e.target.value)}}>
                            <option selected='selected'>{product.active}</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        </div>
                    </div>
                    <div className="productFormMiddle">
                       <div className='formItem'>
                           <label>Color</label>
                          <div className="measurementWrapper">
                        
                          {   
                             colors.map((color,index)=>{
                               return( <MesurementItem itemval={color} index={index} name='color' onUpdateColors={onUpdateColors}/>)
                             })
                          }
                        
                          </div>  
                          <div className='actions'>
                          <Button variant="btn-outlined" id='action-btn-size-remove' size='small' onClick={()=>{setColors([...removeLastIndex(colors)])}}>-</Button> 
                           <Button variant="btn-outlined" id='action-btn-color-add' size='small' onClick={()=>{setColors([...colors,""])}}>+</Button>
                          </div>
                        </div>

                        <div className='formItem'>
                           <label>Size</label>
                           <div className="measurementWrapper">
                        
                          {   
                             sizes.map((size,index)=>{
                               return( <SizeMesurementItem itemval={size} index={index} name='size' onUpdateSizes={onUpdateSizes}/>)
                             })
                          }
                        
                          </div>  
                          <div className='actions'>
                          <Button variant="btn-outlined" id='action-btn-size-remove' size='small' onClick={()=>{setSizes([...removeLastIndex(sizes)])}}>-</Button> 
                           <Button variant="btn-outlined" id="action-btn-size-add" size='small' onClick={()=>{setSizes([...sizes,""])}}>+</Button>
                          </div>
                        </div>
                        <div className='formItem'>
                          
                        </div>
                     
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} alt="" className="productUploadImg" />
                            <label htmlFor="file" style={{display:'block'}}>
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} />
                        </div>
                        <div className='ButtonContainer'>
                        <button type="submit" className="productButton" >Update</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}