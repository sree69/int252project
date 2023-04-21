import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './../components/Navbar';
import '../CSS/display.css'
import { useParams } from 'react-router-dom';



export default function Display() {
  const [display,setdisplay]=useState([])
  const [omdb,setomdb]=useState([])
  const [cast,setcast]=useState([])
  const [error,seterror]=useState([])

  // const [crew,setcrew]=useState([])
const {id}=useParams();

/* Open when someone clicks on the span element */

const overlaycontent=document.getElementById('overlay-content')
function openNav() {

  axios.get(`https://api.themoviedb.org/3/movie/${display?.imdb_id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
  .then((dd)=>{
  //  console.log(dd.data);
  
  if(dd.data)
{  document.getElementById("myNav").style.width = "100%";

if(dd.data.results.length>0){
var embd=[];
dd.data.results.forEach(video=>{
  let {name,key,site}=video
  if(site=='YouTube'){
    embd.push(`
    <iframe width="80%" height="500" src="https://www.youtube.com/embed/${key}"
     title="${name}" frameborder="0" allow="accelerometer;
     autoplay; clipboard-write; encrypted-media;
      gyroscope; picture-in-picture" allowfullscreen></iframe>
    `)
  }
 
})

overlaycontent.innerHTML=embd.join('');

}else{
  overlaycontent.innerHTML=`<h1>no results found</h1>`

}
}
  })

}
  
/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
// console.log(id);
    useEffect(()=>{

   axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((data)=>{
          console.log("====",data.data);
         
          setdisplay(data.data)
          axios.get(`https://www.omdbapi.com/?i=${data.data.imdb_id}&apikey=14780d92`)
      .then((data)=>{
        console.log(data);
        setomdb(data.data)
    
})
})
.catch((err)=>{
  console.log(err);
  seterror(err)
})
axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
.then((credits)=>{
  
  setcast(credits.data.cast.slice(0,10))
  // setcrew(credits.data.crew.slice(0,10))
  console.log(credits.data);
  // console.log(cast);
})

},[])
   

  return (
    <div>
      <div>
      <Navbar/>
      </div>
      {/* <div className='tmbd-display-pic'>
        <div className='tmdb-display'>
           <img src={` https://image.tmdb.org/t/p/original${display.backdrop_path}`}/>

          <div className='tmdb-pic'>
            <div className='tmdb-ppic'><img src={` https://image.tmdb.org/t/p/original${display.poster_path}`}/>
             
             
             </div>     
             <div className='tmdb-text'>
             <div className='tmdb-title'>{display.title}</div>
           {
              display?.genres?.map((rr)=>(
                <span className='tmdb-genre'>{rr.name}</span>
              ))
              }
              <div className='yellow'>Overview</div>

             <div className='tmdb-overview'>{display.overview}</div>
             <div className='yellow'>Ratings</div>

             {
              omdb?.Ratings?.map((rr)=>(
              <div className='span'>
                  <span className='tmdb-'>{rr.Source}:</span>
                <span className='tmdb-yell'>{rr.Value}</span>
              </div>
              ))
              }
              <div className='yellow'>Actors</div>
              <div className='tmdb-overview'>{omdb.Actors}</div>
              <div className='yellow'>Director</div>

              <div className='tmdb-overview'>{omdb.Director}</div>
              <div className='yellow'>Budget</div>

              <div className='tmdb-overview'>${display.budget}</div>
              <div className='yellow'>Box Office</div>

              <div className='tmdb-overview'>{omdb.BoxOffice}</div>
              <div className='yellow'>Awards</div>

              <div className='tmdb-overview'>{omdb.Awards}</div>
              <button onClick={()=>{openNav()}} className='btn btn-outline-success watch'>Watch Related Videos</button>
              </div>  
                   
          </div>
         

        </div>
      </div> */}
        <div class="display">
      {
        error==""?
        <>
         <div class="display-back"> <img src={` https://image.tmdb.org/t/p/original${display.backdrop_path}`}/> </div>
       <div class="info-dp">
        <div class="dp"><img src={` https://image.tmdb.org/t/p/original${display.poster_path}`}/> </div>
        <div class="info">
        
             <div className='tmdb-title'>{display.title}</div>
             <div >
             {
              display?.genres?.map((rr)=>(
             
                  <span className='tmdb-genre'>{rr.name}</span>
               
              ))
              }
               </div>
                 <div className='yellow'>Overview</div>

              <div className='tmdb-overview'>{display.overview}</div>
              <div className='yellow'>Ratings</div>

              {
              omdb?.Ratings?.map((rr)=>(
              <div className='span'>
                  <span className='tmdb-'>{rr.Source}:</span>
                <span className='tmdb-yell'>{rr.Value}</span>
              </div>
              ))
              }
             {/* <div className='yellow'>Actors</div>
              <div className='tmdb-overview'>{omdb.Actors}</div> */}
              <div className='yellow'>Director</div>

              <div className='tmdb-overview'>{omdb.Director}</div>
              <div className='yellow'>Budget</div>

              <div className='tmdb-overview'>${display.budget}</div>
              <div className='yellow'>Box Office</div>

              <div className='tmdb-overview'>{omdb.BoxOffice}</div>
              <div className='yellow'>Awards</div>

              <div className='tmdb-overview'>{omdb.Awards}</div>
              <div className='yellow'>Released</div>
              <div className='tmdb-overview'>{omdb.Released}</div>
              <div className='yellow'>Cast</div>
              <div className='tmdb-cast'>
                {
                  cast.map((artist)=>(
                    <div className='cast-list'>
                  <div className='cast-img'><img src={`https://image.tmdb.org/t/p/original${artist.profile_path}`}/></div>
                  <div>{artist.character}</div>
                  <div>{artist.original_name}</div>
                </div>
                  ))
                }
              </div>
              {/* <div className='yellow'>Crew</div>
              <div className='tmdb-Crew'>
              {
                  crew.map((artist)=>(
                    <div className='cast-list'>
                  <div className='cast-img'><img src={`https://image.tmdb.org/t/p/original${artist.profile_path}`}/></div>
                  <div>{artist.department}</div>
                  <div>{artist.original_name}</div>
                </div>
                  ))
                }
              </div> */}


              <button onClick={()=>{openNav()}} className='btn btn-outline-success watch'>Watch Related Videos</button>
        </div>
       </div>
        </>:
        <>
        <p>Sorry no Data available</p>
        </>
      }
   </div>
        {/* The overlay */}
  <div id="myNav" className="overlay">
    {/* Button to close the overlay navigation */}
    <a href="javascript:void(0)" className="closebtn" >
      <button onClick={()=>{closeNav()}} className='btn btn-outline-danger'>&times;</button>
    </a>
    {/* Overlay content */}
    <div className="overlay-content" id="overlay-content">
      
    </div>
  </div>
  {/* Use any element to open/show the overlay navigation menu */}
  {/* <span onClick={openNav()}>open</span> */}
    </div>
  )
}
