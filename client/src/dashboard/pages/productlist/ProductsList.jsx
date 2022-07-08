 import './productsList.css'
import {DataGrid,GridToolbar
} from '@material-ui/data-grid';
import { Stack } from '@mui/material';
import { DeleteOutline,EditOutlined } from '@material-ui/icons';
import {Tooltip} from '@material-ui/core';
//import QueryParams from '../../QueryParams';
import { Link ,useHistory} from 'react-router-dom';
import {useState,useEffect} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import { formarttoCurrency } from "../../../utils/Utils"
export default function ProductsList({products,handlegetProducts,handleDeleteProduct,isproductsLoaded,setIsproductsLoaded,store}) {   
    const history=useHistory();
    const [pageSize, setPageSize] =useState(10);

  /*   const [storeid]=useState(store._id);
    const [storename] =useState(store.name);
    const [category]  =useState(store.categoryId);
      */
    //alert Dialog
    const [open,setOpen]=useState(false);
    const [productId,setProductId]=useState('');
    const handleClickOpen = () => {
      setOpen(true);
     };

    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {handleDeleteProduct(productId)}
      console.log(option)
    };

    const onDelete=(_id)=>{
       setProductId(_id)
       handleClickOpen();
    }

    const handlenavigateProductPage = (params)=>{
         //navigate to product page
        history.push(`/dashboard/product?productId=${params.row._id}&productName=${params.row.name}&storeId=${store._id}&storeName=${store.name}`);

        localStorage.setItem('product', JSON.stringify(params.row));        
    }
      useEffect(()=>{

        
         if (!isproductsLoaded){

           handlegetProducts();
   
         }
         return ()=>{
             setIsproductsLoaded(true)
         }
      },[handlegetProducts,isproductsLoaded,setIsproductsLoaded]);
     /*   
      async function deleteProduct(_id) {
        try {
          const response = await axios.delete(`http://localhost:3001/api/products/${_id}`);
          console.log(response);
          if (response.data.deletedCount>=1){
          setProducts(products.filter((item) => item._id !==_id))

          }
        } catch (error) {
          console.error(error);
        }
      } */

      
 

    const columns = [
        { field: '_id', headerName: 'Id', width: 220 },
        {
          field: 'name',
          headerName: 'Product',
          width: 330,
          renderCell:(params)=>{
              return(
                  <div className="productListItem"  onClick={()=>{handlenavigateProductPage(params)}}>
                      <img className="productListImg" src={`http://localhost:3001/server/uploads/products/${params.row.image[0].filename}`} alt=""/>
                      {params.row.name}
                  </div>
              )
          },
          editable: true,
        },
        {
          field: 'stock',
          headerName: 'Stock',
          width: 120,
          editable: true,
          renderCell:(params)=>{
            return(
              <div>{params.row.stock.currentstock}</div>
            )
          }
        },
        {
          field: 'active',
          headerName: 'Active',
          width: 120,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 120,
          renderCell:(params)=>{
            return(
              <>
               <span>{`${formarttoCurrency(params.row.price,'π')}`}</span>
              </>
            )
          }
        },
        {
            field:"action",
            headerName:"Action",
            width:120,
            renderCell: (params)=>{
                return(
                   <>
                    <Tooltip title="edit product"  enterDelay={500} leaveDelay={200}>
                    <EditOutlined className="productlistEditIcon" onClick={()=>{handlenavigateProductPage(params)}}>Edit</EditOutlined>
                  </Tooltip>
                  <Tooltip title="delete product" enterDelay={500} leaveDelay={200}>
                    <DeleteOutline className="productlistDelete" onClick={() => {onDelete(params.row._id)}}/>
                  </Tooltip> 
                  </>
                )
            }
        }
      ];
    return (
        <div className="productsList"> 
            <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Are you sure you want to delete!"DeleteOutline={DeleteOutline}/>
          <span className="productsTitle">{store.name}  </span> 

         <div className="productsTitleContainer">
         <h1 className="addProductTitle">Products </h1>

         <Link to={`/dashboard/newProduct?storeId=${store._id}&storeName=${store.name}&categoryId=${store.categoryId}`}>
          <button className="AddProductButton">New Product</button>
          </Link> 
         
          </div>
          <div className="" style={{ height: '100vh', width: '100%' }}>
           <DataGrid rows={products} getRowId={(row) => row._id} columns={columns} 
           pageSize={pageSize}
           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 10, 20,50]}
            pagination
           checkboxSelection
            disableSelectionOnClick 
            components={{
              Toolbar:GridToolbar,
              NoRowsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  No sales recorded
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Local filter returns no result
                </Stack>
              )
            }}/>
            </div>
        </div>
    )
}
