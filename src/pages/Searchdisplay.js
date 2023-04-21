import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Searchdisplay() {
 
  const [movie,setmovie]=useState([])

const {name}=useParams();
useEffect(()=>{

  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${name}&page=1&include_adult=true`)
 .then((ss)=>{
  console.log(ss);
 })
  axios.get(`https://www.omdbapi.com/?apikey=14780d92&s=${name}`)
  .then((data)=>{
    console.log(data.data.Search);
    setmovie(data.data.Search)
  })
},[name])

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
        <div className="popular">
      <div className="pop-heading">Search Results...</div>
     {
      movie!=undefined?
      <div className="popular-card">
      {movie.map((film) => (
        <div class="card" style={{ width: "18rem" }}>
          <Link to={`Displaydemo/${film.imdbID}`}> <img src={film.Poster} class="card-img-top" alt="no image"/></Link>
          {/* <button onClick={()=>{pass(film.imdbID)}}> click</button> */}
        </div>
      ))}
    </div>:
    <div style={{color:"red", marginTop:"50px"}}>

      Sorry Movie not available
    </div>
     }
    </div>

        </div>
    </div>
  )
}
