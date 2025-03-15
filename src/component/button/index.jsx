import React from 'react'
import './button.css'
function Button(props) {
    const {buttonText, classes='', buttonHandler, disabled} = props
  return (
    <div>
      <button 
      onClick={buttonHandler} 
      className={`button ${classes}`}
      disabled={disabled}>{buttonText}</button>
    </div>
  )
}

export default Button
