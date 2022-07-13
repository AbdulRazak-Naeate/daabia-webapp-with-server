/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './flyoutsidebar.css';
import { Link} from 'react-router-dom';
import { LineStyle,Timeline,TrendingUp
    ,PermIdentity,MailOutline,AttachMoney 
    ,Storefront,Add,BarChart,DynamicFeed,
    ChatBubbleOutline,WorkOutline,Report,CloseOutlined } from '@material-ui/icons'
export const  MobileSlider = ({stores,storeindex,handleMouseDown,showMobileSidebar,handleOnStoreChange,setShowMobileSideBar}) => {
    console.log(showMobileSidebar)
  return (
    <div id='flyoutMenu' className={showMobileSidebar ? 'show' : 'hide'} onMouseDown={handleMouseDown}>
              <div style={{position:'absolute',top:'20px',left:'80%'}}><CloseOutlined onClick={()=>{setShowMobileSideBar(!showMobileSidebar)}}/></div>
             <div className="sidebarMenu">
                 <h3 className="sidebarTitle">Dashboard</h3>
                 <ul className="sidebarList">
                     <Link to="/dashboard" className="sidebarlink" onClick={()=>{setShowMobileSideBar(!showMobileSidebar)}}>
                     <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon"/>
                         DashBoard
                     </li>
                     </Link><br/>
                    <li>
                    { stores ?  <select  className="select-store" value={storeindex} onChange={(e)=>{handleOnStoreChange(e)}}>
                  {stores ? stores.map((store,index)=>{
                  return(  <option key={index} value={index} className="opt">{store.name}</option>)
                  }):`<option value="0" class="opt">No stores found </option>`}
              </select>:''}
                    </li>
                 </ul>
                {/*  <h3 className="sidebarTitle">Quick menu</h3> */}
                 <ul className="sidebarList">
                 {/*  <Link to="/dashboard/users" className="sidebarlink">
                  <li className="sidebarListItem">
                         <PermIdentity className="sidebarIcon"/>
                         Users
                     </li></Link> */}
                   {/*  <Link to="/dashboard/stores"  className="sidebarlink">
                    <li className="sidebarListItem">
                         <Storefront className="sidebarIcon"/>
                         Store
                     </li>  
                     </Link> */}
                     <Link to="/dashboard/products" onClick={()=>{setShowMobileSideBar(!showMobileSidebar)}} className="sidebarlink">
                       <li className="sidebarListItem">
                         <Add className="sidebarIcon"/>
                         Products
                     </li> </Link>
                       <Link to="/dashboard/transactions" onClick={()=>{setShowMobileSideBar(!showMobileSidebar)}} className="sidebarlink"> 
                       <li className="sidebarListItem">
                         <AttachMoney className="sidebarIcon"/>
                         Transactions
                     </li>
                       </Link>
                       <Link onClick={()=>{setShowMobileSideBar(!showMobileSidebar)}} to="/dashboard/sales"  className="sidebarlink"> 
                       <li className="sidebarListItem">
                         <TrendingUp className="sidebarIcon"/>
                         Sales
                     </li>
                       </Link>
                    {/*  <li className="sidebarListItem">
                         <BarChart className="sidebarIcon"/>
                         Reports
                     </li> */}
                 </ul>
               {/*   <h3 className="sidebarTitle">Notifications</h3>
                 <ul className="sidebarList">
                     <li className="sidebarListItem">
                         <MailOutline className="sidebarIcon"/>
                         Mail
                     </li>
                     <li className="sidebarListItem">
                         <DynamicFeed className="sidebarIcon"/>
                         FeedBack
                     </li>   <li className="sidebarListItem">
                         <ChatBubbleOutline className="sidebarIcon"/>
                         Messages
                     </li>
                 </ul>
                 <h3 className="sidebarTitle">Staff</h3>
                 <ul className="sidebarList">
                     <li className="sidebarListItem">
                         <WorkOutline className="sidebarIcon"/>
                         Home
                     </li>
                     <li className="sidebarListItem">
                         <Timeline className="sidebarIcon"/>
                         Analytics
                     </li>   <li className="sidebarListItem">
                         <Report className="sidebarIcon"/>
                         Reports
                     </li>
                 </ul> */}
          </div>
    </div>
  )
}


