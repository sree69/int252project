import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import '../CSS/navbar.css'
import '../CSS/popular.css'
import '../CSS/carousal.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Popular from './Popular';
import Loader from '../components/Loader';


export default function Home() {

 
    const [state,setstate]=useState([])
    const [loading,setloading]=useState(false)
    const [genre,setgenre]=useState([])

useEffect(()=>{

setloading(true)
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
    .then((data)=>{
        // console.log(data.data.results);
      
        setstate(data.data.results)
    })

    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
  .then((genre)=>{
    // console.log(genre);
    setgenre(genre.data.genres)
    setloading(false)

  })
},[])   

const select=(id)=>{
  console.log(id);
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&with_genres=${id}`)
  .then((type)=>{
    console.log(type);
    setstate(type.data.results)
  })
  }
 
  return (
    <div>
      
        <div >
        <Navbar/>
       
        </div>
     

 
        <div className='carousal'>
      
            <Carousel
          
            showThumbs={true}
            autoPlay={true}
            transitionTime={2}
            infiniteLoop={true}
            showStatus={false}
            showArrows={true}
            useKeyboardArrows={true}
            >
            
                {
                    state.map((movie)=>(
                        <Link style={{textDecoration: "none" }} to={`/Displaydemo/${movie.id}`}> 
                        <div className='carousal-img'>
                            <img src={` https://image.tmdb.org/t/p/original${movie?movie.backdrop_path:""}`}/>
                        </div>
                        <div className='carousal-text'>
                            <div className='carousal-title'>{movie.original_title}</div>
                            <span className='carousal-rating'>
                                {movie.vote_average}⭐
                                
                            </span>
                            <div className='carousal-runtime'>{movie.overview}</div>
                         
                        </div>
                        </Link>
                    ))
                }
                    
            </Carousel>
            
        </div>
       
        
        <div>
      
         <div className='tags'>
         <div className='tag-list'>
         {
            genre.map((pick)=>(
              <a href='#pop' style={{textDecoration:"none",color:"black"}}> <div className='tag' onClick={()=>{select(pick.id)}} >{pick.name}</div></a>
            ))
          }
         </div>
        </div>

        {
        loading==true?
        <Loader/>
        :
        
        <div className="popular" id="pop">
      
        <div className="popular-card">
          {state.map((movie) => (
            <div class="card" style={{ width: "18rem" }}>
              <Link to={`/Displaydemo/${movie.id}`}> <img src={` https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} class="card-img-top" alt="no image"/></Link>
            </div>
          ))}
        </div>
        
      </div>
      
       }

       
     
     
   
        </div>
    </div>
  )
}
