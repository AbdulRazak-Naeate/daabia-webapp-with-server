/* eslint-disable no-unused-vars */
import React,  { useRef } from 'react';
import './transactions.css';
import {DataGrid} from '@material-ui/data-grid';
import { Stack,Button } from '@mui/material';
import {  Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {useState , useEffect} from "react";
import AlertDialog from '../../components/alertdialog/AlertDialog'
import  {patch} from 'axios';
import QueryParams from '../../QueryParams';
import {TransacModal} from  './modal/TransacModal'

import {PrintBox} from './printbox/PrintBox.jsx';

const Transactions = ({handlegetTransactions,transactions,handlegetStores,isTransLoaded ,setIstransLoaded,handleUpdateManyTransactions,handleUpdateTransaction}) => {
  const [pageSize, setPageSize] = useState(20);
  const [stores]=useState(JSON.parse(localStorage.getItem('stores')));
  const [selectedRows,setSelectedRows]=useState([]);
  const [selected_Ids,setSelected_Id]=useState([]);
  const [selectionModel,setSelectionModel]=useState([])
  const [status,setStatus]=useState('Approved');
  const [open,setOpen]=useState(false);
  const [openModal,setOpenModal]=useState(false)
  const [orderid,setOrderId]=useState('');
  const [tranxData,setTranxData]=useState([]);

   // const history=useHistory();
  //const componentRef = useRef();

   const handlePrint = ()=>{
    setOpenModal(true);
    setTranxData(selectedRows);
    
   };
  
     const handleHover=()=>{
       return(
         <div>userDetails</div>
       )
     }
     const handleClickOpen = (row) => {
           setOrderId(row._id);
           switch (row.status) {
             case 'Pending':
              setStatus('Processing') 
               break;
               case 'Processing':
                setStatus('Completed') 
                 break;
             default:
              setStatus('Processing') 
               break;
           }
       row.status!=="Completed" ? setOpen(true):setOpen(false);
       

      };
    const handleOpenTransacModal =(data)=>{
       setOpenModal(true);
       var arr=[];
           arr.push(data)
       setTranxData(arr);
      
    }
    const handleCloseTransacModal = () =>{ 
      setOpenModal(false);
    }


    const handleClose = (option) => {
      
      setOpen(false);
       if (option===true) {handleUpdateTransaction(orderid,status,setSelectionModel)}
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

  
   
    if (!isTransLoaded){
    if (stores.length >0){handlegetTransactions(stores); 
}
    }
  return () =>{
    
    setIstransLoaded(true)
  }
  },[handlegetStores, handlegetTransactions, isTransLoaded, setIstransLoaded, stores]);
  const getDateNow =(dateNumber)=>{
    var dateString = new Date(parseInt(dateNumber)*1000);
      var newDate= `${dateString.getFullYear()}-${dateString.getMonth()}-${dateString.getDate()} ${dateString.getHours()}:${dateString.getMinutes()}`
      return newDate
   } 




  const columns = [
    { field: '_id', headerName: 'Id', width: 210,
     renderCell:(params)=>{
        return(
          <div style={{color:'cadetblue',cursor:'pointer'}} onClick={()=>{/* handleOpenTransacModal(params.row) */}}>
            {`${params.row._id}`}
          </div>
        )
     },
  },
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
    {
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
      width:160
    },
    {
      field:'totalPrice',
      headerName:"Total Price",
      width:180
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

  return (
    <div className="transactions">
      {/* <button onClick={()=>{
          var datenow= new Date()
        var futureDate = new Date(datenow.setMonth(datenow.getMonth()+1))
        console.log(futureDate.toISOString())
      }}>future Date</button> */}
        <TransacModal openModal={openModal} handleCloseTransacModal={handleCloseTransacModal} tranxData={tranxData} />
       <AlertDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} title="Mark transaction" textContent={`Are you sure you want to mark transaction status as ${status} !`}DeleteOutline={Edit}/>
       <div className="pageTitleContainer">
           <h1 className="pageTitle">Transactions</h1>    
            <div>
          {/*   { stores ?  <select  className="select-store" value={storeid} onChange={(e)=>{setStoreId(e.target.value)}}>
                  {stores ? stores.map((store,index)=>{
                  return(  <option key={index} value={store._id} className="opt">{store.name}</option>)
                  }):`<option value="0" class="opt">No stores found </option>`}
              </select>:''} */}
            <Link to={`/dashboard/transactions?`}>
          <button className="pageTitleButton">Reports</button>
          </Link>
            </div>
          </div>
      <div className="actionButtonsWrapper">
     <button className="actionButtons" onClick={()=>{handleUpdateManyTransactions("Approved",setSelectionModel,selected_Ids);         
      }}>Approve</button>
     <button className="actionButtons" onClick={()=>{handleUpdateManyTransactions("Completed",setSelectionModel,selected_Ids)}}>Completed</button>
     <button className="actionButtons" onClick={()=>{handleUpdateManyTransactions("Pending",setSelectionModel,selected_Ids)}}>Pending</button>
     <button className="actionButtons" onClick={()=>{handleUpdateManyTransactions("Declined",setSelectionModel,selected_Ids)}}>Decline</button>
    {/*  <button className="actionButtons" onClick={()=>{
       setOpenModal(true);
       setTranxData(selectedRows);
       }}>Print List</button>
          */}
     </div>    

          <DataGrid rows={transactions} getRowId={(row) => row._id}   columns={columns}
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
            const selectedData=transactions.filter((trans)=>
               selectedIDs.has(trans._id)
            );
            console.log(selectedData)
           setSelectedRows(selectedData);
        }}
        selectionModel={selectionModel}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No transactions recorded
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          )
        }}
      />
      <div style={{marginBottom:'10%',top:10,border:'0px solid',overflow:'scroll'}}>
      {selectedRows.length > 0 ? <PrintBox style={{display:'none'}} tranxData={selectedRows}/> : ''}
      </div>

    </div>
   
  )
}

export default Transactions

