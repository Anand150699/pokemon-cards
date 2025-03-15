import React from 'react'
import Thumbnail from '../thumbnail'
import Button from '../button'
import './card.css'
function Card(props) {
    const {imageUrl, pokemonName, type, rank, handleKnowMore, details} = props ;
  return (
    <div className={`card ${type}`}>
      <div className='rank'>
        #{rank}
      </div>
      <Thumbnail 
      imageUrl={imageUrl}/>
      <div className='title'>
        {pokemonName}
      </div>
      <div>
        Type: {type}
      </div>
      <div>
      <Button classes={type}  buttonText={'Know more...'} buttonHandler={()=>handleKnowMore(details)} />
      </div>
    </div>
  )
}

export default Card
