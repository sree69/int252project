import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/tvdisplay.css'
import Navbar from './../components/Navbar';

export default function Displaydemo() {
    const {id}=useParams()
    const [display,setdisplay]=useState([])
    const [omdb,setomdb]=useState([])
    const [cast,setcast]=useState([])
    const [error,seterror]=useState([])
    console.log(id);
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

useEffect(()=>{

    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
         .then((data)=>{
           console.log(data.data);
          
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
        <div><Navbar/></div>
       <div>
        {
            error==""?
            <>
             <div className='tvdisplay-backimg' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${display.backdrop_path})`}}>
           <div className='background-overlay'>
           <div className='tvdisplay-details'>
               <div className='tvdisplay-pos'>
               <img src={`https://image.tmdb.org/t/p/original${display.poster_path}`}/>
               </div>
              <div className='tvdisplay-info'>
              <div className='tv-head'>{display.original_title}</div>
              <div className='tvdiaplay-genre'>
              {
                display.genres?.map((read)=>(
                    <div  className='tv-genre'>
                        <div>{read.name}</div>
                    </div>
                ))
              }
              </div>
              <div className='tv-name'>Ratings</div>
              {
              omdb?.Ratings?.map((rr)=>(
              <div className='span'>
                  <span className='tmdb-'>{rr.Source}:</span>
                <span className='tmdb-yell'>{rr.Value}</span>
              </div>
              ))
              }
              
              <div className='tv-name'>Overview</div>
              <div className='tv-value'>{display.overview}</div>
              <div className='tv-name'>Director</div>

              <div className='tv-value'>{omdb.Director}</div>
              <div className='tv-name'>Budget</div>

              <div className='tv-value'>${display.budget}</div>
              <div className='tv-name'>Box Office</div>

              <div className='tv-value'>{omdb.BoxOffice}</div>

            <div className='yellow'>Awards</div>

              <div className='tv-value'>{omdb.Awards}</div>
              <div className='yellow'>Released</div>
              <div className='tv-value'>{omdb.Released}</div>
              <div className='tv-name'>Cast</div>

              <div className='tv-cast'>
                {
                    cast.map((see)=>(
                        <div className='tv-cast-list'>
                            <div><img src={`https://image.tmdb.org/t/p/original${see.profile_path}`}/></div>   
                            <div className='tv-value'>{see.character}</div>                         
                            <div className='tv-value'>{see.original_name}</div>                         
                        </div>
                    ))
                }
              </div>
              {/* <div className='tv-name'>seasons</div>

              <div className='tvdisplay-season'>{
                tvdetail.seasons?.map((read)=>(
                    <div>
                      
                        <div className='season'><img src={`https://image.tmdb.org/t/p/original${read.poster_path}`}/></div>
                        <div>{read.name}</div>
                        <div>{read.episode_count}episodes</div>
                    </div>
                ))
              }</div> */}
            <button onClick={()=>{openNav()}} className='btn btn-success watch'>Watch Related Videos</button>

              </div>

               

            </div>
           </div>

        </div>
            </>
            :
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


    </div>
  )
}
