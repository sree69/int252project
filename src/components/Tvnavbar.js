import React, { useState } from 'react'
import '../CSS/tvhome.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Tvnavbar() {
  const navigate=useNavigate()
  const [tvsearch,settvsearch]=useState()
  const [drop,setdrop]=useState()
  const onchange=(e)=>{
   const tv=e.target.value;
   axios.get(`https://api.themoviedb.org/3/search/tv?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1&query=${tv}&include_adult=true`)
   .then((show)=>{
       
       setdrop(show.data.results)
       
   })
   settvsearch(tv)
   console.log(drop);
  }
  const onclick=(event)=>{
  
    event.preventDefault();
    console.log(tvsearch);
    navigate(`/Tvsearchdisplay/${tvsearch}`)
       


   
  }
  return (
    <div className='navi'>
        <nav className="navbar navbar-expand-lg fixed-top navigation " >
  <div className="container-fluid">
    <a className="navbar-brand" style={{color:"black"}}>
      TV Webb
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon "  />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to="/Tvhome" style={{textDecoration:"none",color:"white"}}>Home</Link>

        </li>
        <li className="nav-item">
        <Link to="/Tvpopular/airing_today" style={{textDecoration:"none",color:"white"}}>On Air Today</Link>

        </li>
        <li className="nav-item">
        <Link to="/Tvpopular/popular" style={{textDecoration:"none",color:"white"}}>Popular</Link>

        </li>
        <li className="nav-item">
        <Link to="/Tvpopular/top_rated" style={{textDecoration:"none",color:"white"}}>Top Rated</Link>

        </li>
        <li className="nav-item">
        <Link to="/Tvpopular/on_the_air" style={{textDecoration:"none",color:"white"}}>On Air</Link>

        </li>
      
      
      </ul>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search your favorite tv shows,series and more......"
          aria-label="Search"
          list="listid"
          onChange={onchange}
          
        />
        <button className="btn btn-success btt"  type="submit" onClick={onclick}>
          Search
        </button>&nbsp;&nbsp;&nbsp;
        <datalist id="listid">
          {
            drop?.map((down)=>(
              <option>{down.original_name}</option>
            ))
          }
        </datalist>
        <button className='btn btn-warning btt'><Link style={{textDecoration:"none",color:"black"}} to='/'>Movie</Link></button>
      </form>
    </div>
  </div>
</nav>

    </div>
  )
}
