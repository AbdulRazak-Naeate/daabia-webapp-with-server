import React from 'react';
import './menuButton.css';

const MenuButton = ({handleMouseDown}) => {
  return (
      <button id="roundButton"
              onMouseDown={(e)=>{handleMouseDown(e)}}></button>
  )
}

export default MenuButton
