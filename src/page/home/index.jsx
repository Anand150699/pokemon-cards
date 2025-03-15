import React, { useEffect, useState } from 'react'
import Card from '../../component/card'
import './home.css'
import { BASE_URL } from './constant';
import Button from '../../component/button';
import Dialogue from '../../component/modal';
//CONTAINER
//Home page logic will be defined here
function Home() {
  const [pokemonList, setPokemonList] = useState([]) ;
  const [nextUrl, setNextUrl] = useState('') ;
  const [shoeDetailsDialogue, setShowDetailsDialogue]  = useState(false)
  const [selectedDetailsm, setSelectedDetails] = useState([{}]) ;

  async function fetchPokemon(url){

      try {
        const data = await fetch(url) ;
        const res = await data.json() ;
        const result = res[0].results
        for(let i = 0 ; i<result.length ; i++) {
          result[i].details = await getSinglePokemonDetails(result[i].url) ;
        }
        console.log(res[0].results)
        setPokemonList( [...pokemonList,...res[0]?.results])
        setNextUrl(res[0].next)
      }
      catch (error){
        console.log('Error::' , error)
      }
  }

  async function getSinglePokemonDetails(url){

    try{
      const res = await fetch(url) ;
      const data = await res.json() ;
      const details = data[0] ;
      return details ; 
    }
    catch (error){
      console.log('Error::' , error)
    }
  }
  useEffect (()=>{
    const url = `${BASE_URL}1`
    fetchPokemon(url)
  }, [])

  function loadMore () {
    fetchPokemon(nextUrl)
  }

  function knowMore(details){
    setShowDetailsDialogue(!shoeDetailsDialogue)
    setSelectedDetails(details)
  }
  return (
    <div>
      <h3 className='header'>Pokemon Kingdom</h3>
      {/* <Thumbnail imageUrl={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'}/>
      <Button buttonText={'Know More...'}/> */}
      <div className='pok-container'>
      {
        pokemonList.map((ele, ind)=>{
          return(
            <Card 
              key={ind}
              type={ele.details.type}
              pokemonName={ele.name}
              rank={ele.details.id}
              imageUrl={ele.details.image}
              handleKnowMore={knowMore}
              details={ele.details}/>
          )
        })
      }
      </div>
      <div className='pagination'>
        <Button 
        buttonText={'More Pokemons...'}
        classes={'load-more'}
        buttonHandler={loadMore}
        disabled={!nextUrl}/>
      </div>
      <Dialogue show={shoeDetailsDialogue} 
      setShowDetailsDialogue={setShowDetailsDialogue}
      type={selectedDetailsm.type}>
        <div className='main-stat'>
            <div className='dialogue-left'>
              <img src={selectedDetailsm.image}/>
              <h2>{selectedDetailsm.name}</h2>
            </div>
            <div className='dialogue-right'>
              <div className='flex-direction-column wght-cont'>
                <span><strong>Weight:</strong>{selectedDetailsm.weight}</span>
                <span><strong>Height:</strong>{selectedDetailsm.height}</span>
              </div>
              <div className='flex-direction-column stat-cont'>
                {
                  selectedDetailsm?.stats?.map((ele, ind)=>{
                    return(
                      <div className='stat-data'>
                        <span style={{fontWeight:'bold'}}>Stat{ind+1} : </span>
                        <span>{ele?.stat?.name}</span>
                      </div>
                    )
                  })
                }
              </div>
              <div className='flex-direction-column bs-cont'>
              {
                  [1,2,3,4,5].map((ele, ind)=>{
                    return(
                      <div className='bs-data'>
                        <span style={{fontWeight:'bold'}}>Bs{ind+1}:</span>
                        <span>Attack</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </div>
      </Dialogue>
    </div>
  )
}

export default Home
