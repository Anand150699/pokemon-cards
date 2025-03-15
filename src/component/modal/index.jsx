import React, { useEffect, useState } from 'react'
import './modal.css'
function Dialogue(props) {
    const[showDialogue, setShowDialogue] = useState()

    useEffect(()=>{
        setShowDialogue(props.show)
    },[props.show])
    
    function closeDialogue(){
        setShowDialogue(false) ; 
        props.setShowDetailsDialogue(false) ;
    }
  if(!showDialogue){
    return null ;
  }
  return (
  
    <div className='dialogue'>
      <div className='dialogue-overlay'></div>
      <div className={`dialogue-content ${props.type}`}>
      <div className='dialogue-header'>
        <div className='cross-icon' onClick={closeDialogue}>
            x
        </div>
      </div>
        {props.children}
      </div>
    </div>

  )
}

export default Dialogue

