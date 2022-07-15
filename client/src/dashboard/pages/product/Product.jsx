import {useEffect, useState} from 'react'
import './product.css';
import {Link} from "react-router-dom";
import {Button,Grid} from '@mui/material';
import { Chart } from '../../components/charts/Chart';
import { Publish,Edit } from '@material-ui/icons';
import QueryParams from '../../QueryParams';
import {patch}from 'axios';
import { EditorState , convertToRaw,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import TextEditor from '../newProduct/textEditor/TextEditor';
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';

import { convertValueFromExponent} from "../../../utils/Utils"

  const MesurementItem = ({itemval,index,name,onUpdateColors})=>{
       
      const [val,setValue]=useState(itemval);
       return( <input type="text" className={`measurementItem ${name}`} placeholder="" value={val} key={index} onChange={(e)=>{setValue(e.target.value);onUpdateColors(name)}}  id={`${name}${index}`}/>)
       }
       
      const SizeMesurementItem = ({itemval,index,name,onUpdateSizes})=>{
        const [sval,setsValue]=useState(itemval);
     return( <input type="text" className={`measurementItem ${name}`} placeholder="" value={sval} key={index} onChange={(e)=>{setsValue(e.target.value);onUpdateSizes(name)}}  id={`${name}${index}`}/>)
    }

export default function Product({store}) {
    const query=QueryParams();
    const [product,setProduct]= useState(JSON.parse(localStorage.getItem('product')));
    const [storeid]=useState(query.get('storeId'));
    const [storename]=useState(query.get('storeName'));
    const [productid]=useState(product._id); 
    const [productname]=useState(product.name);
    const [colors,setColors]=useState(product.color);
    const [sizes,setSizes]=useState(product.size);
    // eslint-disable-next-line no-unused-vars
    const [stock,setStock]=useState(product.stock.currentstock);
    const [addStock,setaddStock]=useState(0);
    const [active,setActive]=useState(product.active);
    const [price,setPrice]=useState(convertValueFromExponent(product.price));
    const [shippingFees,setShippingFees]=useState(convertValueFromExponent(product.shippingFees));
    const [monthlySales,setmonthlySales]=useState([]);
    const [productUpdated,setProductUpdated]=useState(false);
    //Editor
    const [description,setDescription]=useState('');
    const blocksFromHtml = htmlToDraft(product.description);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    const [editorstate,setEditorState]=useState(editorState);
    const [showForms,setShowForms]=useState(false)
    const [sales,setSales]=useState({})
    const [isSalesLoaded,setIsSalesLoaded]=useState(false);
    const[user]=useState(JSON.parse(localStorage.getItem('user')));

      const removeLastIndex = (values) => {
          let arr=[...values];
           arr.pop(values.length-1);
           console.log(values);
        return arr;
      }
      const onEditorStateChange = (editorstate)=>{
        console.log(editorstate.value)
        const htmlcontent=draftToHtml(convertToRaw(editorstate.getCurrentContent()))
        setEditorState(editorstate)
        setDescription(htmlcontent);
        
    }
     const handleonEditClicked=()=>{
        setShowForms(!showForms);
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
                     setPrice(convertValueFromExponent(response.data.price));
                     setShippingFees(convertValueFromExponent(response.data.shippingFees))
                     setActive(response.data.active);
                     setColors(response.data.color);
                     setSizes(response.data.size);
                     setDescription(response.data.description)
                     console.log(response);              
                     setProductUpdated(!productUpdated)
}                    setaddStock(0);
               

            });
      }

      const editProduct =()=>{
        const url = `http://localhost:3001/api/products/${productid}`;
      /*   const colval=getValues('color');
        console.log(colval);
        const sizeval=getValues('size'); */
        const body={
                 productId:productid,
                 price:price,
                 shippingFees:shippingFees,
                 description:description,
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
        const handlegetSales = async ()=>{
          // console.log("get cart"+userid)
          
            getSales().then((response) => {

              if (response.status===200){
                try{
                 
                      setmonthlySales(response.data)
                  
                }catch(err){
                  console.log(err)
                }
              }
            })
          
        }
        
        
          
        
          const getSales =()=>{
             
            const url = `http://localhost:3001/api/analytics/transactions/product/sales/monthly/${product.storeId}/${product._id}`;
            
            return axios.post(url,{year:2022})
          
          };

          if(!isSalesLoaded){
            handlegetSales()
          }

         return  () =>{
          setIsSalesLoaded(true)
         }
      },[isSalesLoaded, monthlySales, product])
    return (
        <div className="product">
           <div className='storeCurrencyLabel'>
           <span>{storename}</span>
            <span>{` Local currency: ${store.currency}`}</span>
           </div>
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
            <Grid container justsifyContent='center' sx={12} sm={12} md={12} lg={12}>
                    <Grid item sx={12} sm={12} md={7} lg={7} >
                      <div className="productInfoTopWrapper">
                       <Chart data={monthlySales.monthlySales} datakey="Monthly Sales"  title="Sales Performance"/> 
                      </div>
                    
                    </Grid>
                    <Grid item sx={12} sm={12} md={5} lg={5} >
                      <div className="productInfoTopWrapper">
                         <div className="productInfoTop">
                        <img src={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} alt="" className="productInfoImg" />
                       <span className="productName">{productname}</span>
                        <Edit onClick={handleonEditClicked}/>

                    </div>
                    <div className="productInfoBottom">
                        <span className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue">{" "+product._id}</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">sales</span>
                            {monthlySales ? <span className="productInfoValue">{monthlySales.count}</span>:'0'}
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
                            <label className="productInfoValue" id="price">{`π${convertValueFromExponent(product.price)}`}</label>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">shipping:</span>
                            <label className="productInfoValue" id="shipping">{`π${convertValueFromExponent(product.shippingFees)}`}</label>
                        </span>
                    </div>
                      </div>
                   
                    </Grid>
                </Grid>
            </div>
           { showForms ? <div className="productBottom">
               
                <form className="productForm" onSubmit={handleUpdate}>
                    
                <Grid container justifyContent='space-around' sx={12} sm={12} md={12} lg={12}>
                   <Grid item sx={12} sm={12} md={8} lg={8}>
                     <div className='formItem'>
                       <label>Product Name</label>
                        <input type="text" className='productNameinput' value={product.name} onChange={()=>{}} placeholder="Apple Airpod"/></div>
                        <div className='formItem'>
                        <label htmlFor="validationTextarea">Description</label>
                       <TextEditor onEditorStateChange={onEditorStateChange} editorstate={editorstate}/>
                        </div>
                   </Grid>
                   <Grid item sx={12} sm={12} md={1} lg={1}>
                   
                    </Grid>
                    <Grid item justifyContent='flex-start' direction={'column'} sx={12} sm={12} md={3} lg={3}>
                    <div className='formItem'>
                         <label>Price</label>
                        <input type="number" placeholder="0.0001"value={price}onChange={(e)=>{setPrice(e.target.value)}}/>
                       </div>
                       <div className='formItem'>
                        <label>Add Stock</label>
                        <input type="text" id="stock" value={addStock}   placeholder="0" onChange={(e)=>{setaddStock(e.target.value)}}/>
                        </div>
                        <div className='formItem'>
                        <label>Active</label>
                        <select name="active" id="" className="active" onChange={(e)=>{setActive(e.target.value)}} value={active}>
                           {/*  <option selected='selected'>{product.active}</option> */}
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        </div>
                        <div className='formItem'>
                        <label>setShippingFees</label>
                        <input type="number" id="shippingfees" value={shippingFees}   placeholder="0.00000012" onChange={(e)=>{setShippingFees(e.target.value)}}/>
                        </div>
                        <div className='formItem'>
                           <label>Color</label>
                          <div className="productmeasurementWrapper">
                        
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
                           <div className="productmeasurementWrapper">
                        
                          {   
                             sizes.map((size,index)=>{
                               return( <SizeMesurementItem  itemval={size} index={index} name='size' onUpdateSizes={onUpdateSizes}/>)
                             })
                          }
                        
                          </div>  
                          <div className='actions'>
                          <Button variant="btn-outlined" id='action-btn-size-remove' size='small' onClick={()=>{setSizes([...removeLastIndex(sizes)])}}>-</Button> 
                           <Button variant="btn-outlined" id="action-btn-size-add" size='small' onClick={()=>{setSizes([...sizes,""])}}>+</Button>
                          </div>
                        </div>
                        
                        <div className="productUpload">
                              <img src={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} alt="" className="productUploadImg" />
                            <label htmlFor="file" style={{display:'block'}}>
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} />
                 
                        
                        </div>
                          <div className='editButtonContainer'>
                        <button type="submit" className="productButton" >Update</button>
                        </div>
                    </Grid>
               </Grid>
                   {/*  <div className="productFormLeft">                    
                  
                        <div className='formItem'>
                          
                        </div>
                    </div>
                    <div className="productFormMiddle">
                   
                      
                     
                    </div>
                    <div className="productFormRight">
                
                           
                       
                    </div> */}
                </form>
            </div>:''}
        </div>
    );
}