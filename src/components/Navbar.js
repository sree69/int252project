import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../CSS/navbar.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'



export default function Navbar() {

  
const [search,setsearch]=useState([])
const [drop,setdrop]=useState([])
const onchange=(e)=>{
  const value=e.target.value;
 
  setsearch(value)
  axios.get(`https://www.omdbapi.com/?apikey=14780d92&s=${value}`)
  .then((data)=>{
    // console.log(data.data.Search);
    setdrop(data.data.Search)
   
  })
  console.log(search);
}
const items=drop;
const submit=()=>{
  
}

  return (
    <div className='navv'>
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#" style={{color:"Yellow"}}>MovieWebb</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/" style={{textDecoration:"none",color:"white"}}>Home</Link>
        </li>
        <li class="nav-item">
        <Link to="/Upcoming" style={{textDecoration:"none",color:"white"}}>Upcoming</Link>

      
        </li>
        <li class="nav-item">
        <Link to="/Popular" style={{textDecoration:"none",color:"white"}}>Popular</Link>

        </li>
        <li class="nav-item">
        <Link to="/Toprated" style={{textDecoration:"none",color:"white"}}>Top Rated</Link>

        </li>
        <li class="nav-item">
        <Link to="/Latest" style={{textDecoration:"none",color:"white"}}>Now playing</Link>

        </li>
      
        
      </ul>
    
      <form class="d-flex">
     
        <div className='input-button'>
       
        <input class="form-control me-2 search"  list='listid' type="search" placeholder="Search your favorite movies....." aria-label="Search" onChange={onchange} required/> 
        <button class="btn btn-info" type="submit"  onClick={submit}><Link style={{textDecoration:"none",color:"white"}} to={`/Searchdisplay/${search}`} >Search</Link></button>&nbsp;&nbsp;
         <div className='btn btn-success' ><Link style={{textDecoration:"none",color:"white"}} to='/Tvhome' >TV</Link></div>
        
 <datalist id='listid'>
  {
    drop?.map((read)=>(
      <option   ><img src={`${read.Poster}`} />{read.Title}</option>
    ))
  }
   
   
</datalist>
 </div>
       
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}
