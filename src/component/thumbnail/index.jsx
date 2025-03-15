import React from 'react'

function Thumbnail(props) {
    const {imageUrl , height=120, width=120} = props ;
  return (
    <div>
      <img height={height} width={width} src={imageUrl}/>
    </div>
  )
}

export default Thumbnail