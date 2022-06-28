/* eslint-disable no-unused-vars */
import React from 'react';
import './sales.css';
import {DataGrid} from '@material-ui/data-grid';
import { Stack } from '@mui/material';
import {  Edit } from '@material-ui/icons';
import { Link} from 'react-router-dom';
import {useState , useEffect} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import {patch} from 'axios';
import QueryParams from '../../QueryParams';

const Sales = ({sales,setSales,handlegetSales,isSalesLoaded,setIsSalesLoaded}) => {
  const [pageSize, setPageSize] = useState(20);
  const [user]=useState(localStorage.getItem('user'));
  const [stores]=useState(JSON.parse(localStorage.getItem('stores')));

   const [storeid,setStoreId]=useState('');

  const [selectedRows,setSelectedRows]=useState([]);
  const [selected_Ids,setSelected_Id]=useState([]);
  const [selectionModel,setSelectionModel]=useState([])
  const [status,setStatus]=useState('Approved');
  const [open,setOpen]=useState(false);
  const [orderid,setOrderId]=useState('');


 
    const handleClickOpen = (row) => {
           setOrderId(row._id);

      };

    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {/* handleUpdate(orderid) */}
      //console.log(orderid);
    };
 
  const Span=({id,onClick,type})=>{ 
    /*@param id is the order id 
     *@param onClick is the click event 
     *@param type is the button class type Pending ,Approved Declined
     */
    return <span onClick={onClick} id={"status-span-"+id} className={"transStatusSpan "+type}>{type}</span>
}
  
   
  useEffect(() => {  
    
  if(!isSalesLoaded){
   if (stores.length>0){ handlegetSales(stores);}
  }
 
   return ()=>{
     setIsSalesLoaded(true)
   }

  },[handlegetSales, isSalesLoaded, setIsSalesLoaded, storeid, stores]);
  

  const columns = [
    { field: '_id', headerName: 'Id', width: 210 },
    {
      field:'user',
      headerName:"Customer",
      width:200,
        renderCell:(params)=>{
          return(
            <div className="userListUser">
                {`${params.row.customer.firstname} ${params.row.customer.lastname}`}
            </div>
        )}, 
    },
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
     /*  renderCell:(params)=>{
          return(
              <div className="userListUser">
                  <img className="userListImg" src={`http://localhost:3001/server/uploads/users/${params.row.image[0].filename}`} alt=""/>
                  {params.row.username}
              </div>
          )
      }, */
      editable: true,
    },
    {
      field:'storeId',
      headerName:"Store Id",
      width:210,
      editable:true
    },
    {
      field:'orderNumber',
      headerName:"OrderNumber",
      width:170,
    },
   /*  {
      field:'quantity',
      headerName:"Quantity",
      width:130
    },
    {
      field:'color',
      headerName:"Color",
      width:120
    },
    {
      field:'size',
      headerName:"Size",
      width:120
    },
    {
      field:'priceEach',
      headerName:"Price Each",
      width:140
    }, */
    {
      field:'totalPrice',
      headerName:"Amount",
      width:140,
      renderCell:(params)=>{
          return(<div>{`${params.row.totalPrice}`}</div>)
      }
    },
  /*   {
      field: 'fullname',
      headerName: 'Full Name',
      width: 220,
      editable: true,
      renderCell:(params)=>{
         return(
          <div>{`${params.row.firstname} ${params.row.lastname}`}</div>
         )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      editable: true,
    }, */
    {
      field:"status",
      headerName:"Status",
      width:120,
      renderCell:(params)=>{
        return(
               <div> <Span id={params.row._id} onClick={()=>handleClickOpen(params.row)} type={`${params.row.status}`}></Span></div>
             )
      }
    },
    {
      field:'date',
      headerName:"Date",
      width:300,
      renderCell:(params)=>{
        return(
            <div>
               {new Date(params.row.date).toUTCString()}
            </div>
        )
      }
    },
   /*  {
        field:"action",
        headerName:"Action",
        width:140,
        renderCell: (params)=>{
            return(
               <>
                <Edit  className="userlistDelete storeListIcons" />

            
                <DeleteOutline className="userlistDelete" onClick={() => {}}/>
               </>
            )
        }
    } */
  ];
    const handleStoreChange = (e)=>{
       setStoreId(e.target.value)
    }
  return (
    <div className="sales">

       <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Mark transaction" textContent={`Are you sure you want to mark transaction status as ${status} !`}DeleteOutline={Edit}/>
       <div className="pageTitleContainer">
           <h1 className="pageTitle">Sales</h1>    
            <div>
            <Link to={`/dashboard/sales?`}>
          <button className="pageTitleButton">Reports</button>
          </Link>
            </div>
          </div>
          <DataGrid rows={sales} getRowId={(row) => row._id}   columns={columns}
           pageSize={pageSize}
           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
           rowsPerPageOptions={[5, 10, 20]}
           pagination
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
             setSelectionModel(newSelection)
             setSelected_Id(newSelection);
             console.log(newSelection);
            const selectedIDs = new Set(newSelection);
            const selectedData=sales.filter((trans)=>
               selectedIDs.has(trans._id)
            );
            
           console.log(selectedData)
           setSelectedRows(selectedData);
        }}
        selectionModel={selectionModel}
        components={{
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
        }}
      />
  {/*    <div className="actionButtonsContainer">
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Approved");         
}}>Approve</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Pending")}}>Pending</button>
     <button className="actionButtons" onClick={()=>{handleUpdateMany("Declined")}}>Decline</button>
     </div> */}
    </div>
  )
}

export default Sales

