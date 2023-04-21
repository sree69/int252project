import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Tvnavbar from '../components/Tvnavbar'
import '../CSS/tvdisplay.css'


export default function Tvdisplay() {

    const {id}=useParams()
    const [tvdetail,settvdetail]=useState([])
    const [credit,setcredit]=useState([])
    // console.log(id);
    useEffect(()=>{
        axios.get(`
        https://api.themoviedb.org/3/tv/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((tv)=>{
            // console.log(tv.data);
            settvdetail(tv.data)
        })
        axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((credit)=>{
            console.log(credit);
            setcredit(credit.data.cast.slice(0,10))
        })

    },[])
console.log(tvdetail);
  return (
    <div className='tv-display-main'>
        <div>
            <Tvnavbar/>
        </div>
        <div className='tvdisplay-backimg' style={{backgroundImage:` url(https://image.tmdb.org/t/p/original${tvdetail.backdrop_path})`}}>
          <div className='background-overlay'>
          <div className='tvdisplay-details'>
               <div className='tvdisplay-pos'>
               <img src={`https://image.tmdb.org/t/p/original${tvdetail.poster_path}`}/>
               </div>
              <div className='tvdisplay-info'>
              <div className='tv-head'>{tvdetail.name}</div>
              <div className='tvdiaplay-genre'>
              {
                tvdetail.genres?.map((read)=>(
                    <div  className='tv-genre'>
                        <div>{read.name}</div>
                    </div>
                ))
              }
              </div>
              <div className='tv-name'>Overview</div>
              <div className='tv-value'>{tvdetail.overview}</div>
              <div className='tv-name'>No: of episodes</div>

              <div className='tv-value'>{tvdetail.number_of_episodes}</div>
              <div className='tv-name'>No: of Seasons</div>

              <div className='tv-value'>{tvdetail.number_of_seasons}</div>
              <div className='tv-name'>Votes</div>

              <div className='tv-value'>{tvdetail.vote_average}</div>
              <div className='tv-name'>Cast</div>

              <div className='tv-cast'>
                {
                    credit.map((see)=>(
                        <div className='tv-cast-list'>
                            <div><img src={`https://image.tmdb.org/t/p/original${see.profile_path}`}/></div>   
                            <div className='tv-value'>{see.character}</div>                         
                            <div className='tv-value'> {see.original_name}</div>                         
                        </div>
                    ))
                }
              </div>
              <div className='tv-name'>seasons</div>

              <div className='tvdisplay-season'>{
                tvdetail.seasons?.map((read)=>(
                    <div>
                      
                        <div className='season'><img src={`https://image.tmdb.org/t/p/original${read.poster_path}`}/></div>
                        <div className='tv-value'>{read.name}</div>
                        <div className='tv-value'>{read.episode_count}episodes</div>
                    </div>
                ))
              }</div>
              </div>

               

            </div>
          </div>

        </div>
    </div>
  )
}


// linear-gradient(180deg, transparent 80%,white 99%),