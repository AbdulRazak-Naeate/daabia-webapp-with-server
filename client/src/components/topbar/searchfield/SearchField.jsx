import React from 'react'
import './searchfield.css'

function SearchField({handlesearchProduct}) {

  return (
    <div>
      <input   className='search-input' placeholder='Search products...'  onChange={(e)=>{handlesearchProduct(e.target.value)}}/>
     
    </div>
  )
}

export default SearchField
