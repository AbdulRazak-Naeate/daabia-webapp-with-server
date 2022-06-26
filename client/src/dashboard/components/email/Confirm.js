import React,{useState,useEffect} from 'react';
import QueryParams from '../../QueryParams'
import axios from 'axios';
const Confirm = () => {
    const query =QueryParams();
    const[confirming,setConfirming]=useState(true);
    const[message,setMessage]=useState('')
     const [id] =useState(query.get('_id'))

     
    useEffect(()=>{
       
        axios.post(`http://localhost:3001/api/email/confirm/${id}`).then((res)=>{
          setConfirming(false)
          setMessage(res.data.msg);
        })
    },[id])
  return (
    <div className='confirm'>
      {
          confirming ? 'Confirming ...' :
           <div style={{padding:'20px 40px'}}>
           <h1>Daabia</h1> <br/>
          {message}
          </div>
      }
    </div>
  )
}

export default Confirm
