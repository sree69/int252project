import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/popular.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Upcoming() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      )
      .then((data) => {
        // console.log(data.data.results);
        setstate(data.data.results);
      })
  }, [])
  return (
    <div>
<div>
<Navbar/>
    </div>
    <div>
    <div className="popular">
      <div className="pop-heading">Upcoming Movies</div>
      <div className="popular-card">
        {state.map((movie) => (
          <div class="card" style={{ width: "18rem" }}>
            <Link to={`/Displaydemo/${movie.id}`}> <img src={` https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} class="card-img-top" alt="no image"/></Link>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  )
}
