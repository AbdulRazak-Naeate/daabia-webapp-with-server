import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {Button} from '@mui/material';
import {Facebook,Instagram,YouTube,Twitter} from '@mui/icons-material'
import './footer.css';
import axios from 'axios';
const Footer = () => {
  const[email,setEmail]=useState('');
  const handleSubscription = (e) =>{
      
        e.preventDefault();
       var url =`http://localhost:3001/api/subscribe/${email}`;
          axios.post(url).then((response)=>{
             setEmail('');
          console.log(response)
     })
  }

  return (
       <div className='footer-container'>
      <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the Adventure newsletter to recieve deals
                </p >
                <p className='footer-subscription-text'>
                    You can unsubscribe at any time
                </p>
                <div className='input-areas'>
                    <form onSubmit={handleSubscription} >
                        <input  type='email' name='email' placeholder='Your Email' value={email}
                        className='footer-input' onChange={(e)=>{setEmail(e.target.value)}}/>
                            <Button type="submit" variant="outlined" >Subscribe</Button>
                     
                    </form>
                </div>
            </section>
       <div className='footer-links'>
            {/*   <div className='footer-link-wrapper'>
                  <div className="footer-link-items">
                    <h2>About Us</h2>
                    <Link to='signup'>How it works</Link>
                    <Link to='/'>Testimonials</Link>
                    <Link to='/'>Careers</Link>
                    <Link to='/'>Investors</Link>
                    <Link to='/'>Terms of Service</Link>

                  </div>
                  <div className="footer-link-items">
                    <h2>Contact Us</h2>
                    <Link to='/'>Contact</Link>
                    <Link to='/'>Support</Link>
                    <Link to='/'>Destinations</Link>
                    <Link to='/'>Sponsorship</Link>
 
                  </div>
              </div> */}
              <div className='footer-link-wrapper'>
                  {/* <div className="footer-link-items">
                    <h2>Videos</h2>
                    <Link to='/'>Submit Videos</Link>
                    <Link to='/'>Ambassodors</Link>
                    <Link to='/'>Agency</Link>
                    <Link to='/'>Influencer</Link>
                  </div> */}
                  <div className="footer-link-items">
                     <h5>Connect with US </h5>
                    <Link to='/'><Instagram/></Link>
                    <Link to='/'><Facebook/></Link>
                    <Link to='/'><YouTube/></Link>
                    <Link to='/'><Twitter/></Link>
 
                  </div>
                </div>
              </div> 
              <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              {process.env.REACT_APP_WEBSITE_NAME.toUpperCase()}
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>{`${process.env.REACT_APP_WEBSITE_NAME} © ${new Date().getFullYear()}`}</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
        </div> 
  )
}

export default Footer
