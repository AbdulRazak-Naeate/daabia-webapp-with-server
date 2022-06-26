/* eslint-disable no-unused-vars */
import React , {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import "./topbar.css"
import imgAvatar from '../../../assets/icons/user_96px.png';
import {NotificationsNone,Language} from '@material-ui/icons'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Store from '@mui/icons-material/Store';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Person from '@mui/icons-material/Person';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export const Topbar = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [imagefilename,setImageFilename]=useState('');
    const [userId,setuserId]=useState(null)
    const [loggedin,setLoggedIn]=useState(JSON.parse(localStorage.getItem('loggedin')));
  
    const history=useHistory();
    const imgonLoadError=(e)=>{
      try{
        e.target.onerror = null; 
        e.target.src = imgAvatar
      }catch(error){
        console.log({error:error});
      }
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleLogout=()=>{
         setAnchorEl(null);
         localStorage.setItem('loggedin',false);
         history.push('/dashboard/login');
      
        
      }
      
      useEffect(()=>{
        if (history.location.pathname==="/dashboard/login"||history.location.pathname==="/dashboard/signup"){
          localStorage.setItem('loggedin',false);
          setLoggedIn(false)
        }
          var user =localStorage.getItem('user');
           //console.log("user "+user)
           if (user!==null){
             if (localStorage.getItem('loggedin'!==false)){
               try{
                loggedin ? setImageFilename(user.image[0].filename) : setImageFilename('');
                loggedin ? setuserId(user._id):setImageFilename('');
                }catch(err){ 
                  console.log({error:err})
                }

             }


           }else{
                history.push('/dashboard/login'); 
           }
      
       
      },[user,loggedin,history])
      
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="title">{`${process.env.REACT_APP_WEBSITE_NAME}`}</span>
                </div>
                <div className="topRight">
                  {/*   <div className="topbarIonContainer">
                        { loggedin && <>  <NotificationsNone/>
                       <span className="topIconBadge">2</span> </>}
                    </div>
                    <div className="topbarIonContainer">
                      { loggedin && <> <Language/>
                        <span className="topIconBadge">2</span> </>}
                    </div> */}
                    <div className="topbarIonContainer">
                      <img src={`http://localhost:3001/server/uploads/users/${imagefilename}`} onClick={handleClick}  id="avatar"  onError={imgonLoadError} alt=""  className="topAvatar" /> 
                    </div>
                    
                </div>
        {loggedin && <React.Fragment>
         <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <Link className="topbarLink" to={{pathname:`/dashboard/user/_id=${userId}`,search:`user=${JSON.stringify(user)}`}}>
        <MenuItem onClick={handleClose} className="topbarLink"><ListItemIcon> <Person fontSize="small" /> </ListItemIcon>Account</MenuItem></Link>
        <Link className="topbarLink" to={{pathname:`/dashboard/stores`}}>
        <MenuItem onClick={handleClose}><ListItemIcon><Store/></ListItemIcon>My Stores</MenuItem>
        </Link>
        <Divider/>
      {/*<MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>*/}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </React.Fragment>}
            </div>
        </div>
    )
}
