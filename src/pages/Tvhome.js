import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Tvnavbar from "../components/Tvnavbar";
import "../CSS/tvhome.css";

import axios from "axios";
import Popular from "./Popular";
import { Link } from "react-router-dom";

export default function Tvhome() {
  const [popular, setpopular] = useState([]);
  const [toprated, settoprated] = useState([]);
  const [onair, setonair] = useState([]);
  const [onairtoday, setonairtoday] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`
      )
      .then((data) => {
        setpopular(data.data.results.slice(0, 8));
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`
      )
      .then((data) => {
        settoprated(data.data.results.slice(0, 8));
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`
      )
      .then((data) => {
        setonair(data.data.results.slice(0, 8));
      });
    axios
      .get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`
      )
      .then((data) => {
        setonairtoday(data.data.results.slice(0, 8));
      });
  }, []);

  console.log("pop=>", popular);
  console.log("top=>", toprated);
  console.log("air=>", onair);
  console.log("today=>", onairtoday);

  return (
    <div className="tv-home-main">
      <div className="tv-nav">
        <Tvnavbar />
      </div>
      <div className="tv-main">
        <div className="tv-carousal">
          <Carousel
            swipeable={true}
            infiniteLoop={true}
            autoPlay={true}
            showThumbs={false}
            stopOnHover={true}
            showStatus={false}
            showArrows={("showArrows", true, "Toggles")}
          >
            {toprated.map((pop) => (
              <Link to={`Tvdisplay/${pop.id}`}>
                <div
                  className="pop-img"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${pop.backdrop_path})`,
                  }}
                ></div>
                <div className="pop-details">
                  <div className="pop-name" style={{ textDecoration: "none" }}>
                    {pop.name}
                  </div>
                  <div className="pop-over" style={{ textDecoration: "none" }}>
                    {pop.overview}
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
        <div className="tv-title">Popular</div>
        <div className="tv-popular">
        {
            popular.map((pop)=>(
              <Link to={`Tvdisplay/${pop.id}`}>
                <div className="card" >
                   <div className="content_img">
                   <img src={`https://image.tmdb.org/t/p/original${pop.poster_path}`}/>
                    {/* <div className="card-img" style={{backgroundImage: ` url(https://image.tmdb.org/t/p/original${pop.poster_path})`}}></div> */}
                    <div className="hov">{pop.overview}</div>
                      
                   </div>

                    
                </div></Link>
            ))
        }
        </div>
        <div className="tv-title">On Air Today</div>
        <div className="tv-popular">
        {
            onairtoday.map((pop)=>(
                <Link to={`Tvdisplay/${pop.id}`}>
                <div className="card" >
                   <div className="content_img">
                   <img src={`https://image.tmdb.org/t/p/original${pop.poster_path}`}/>
                    {/* <div className="card-img" style={{backgroundImage: ` url(https://image.tmdb.org/t/p/original${pop.poster_path})`}}></div> */}
                    <div className="hov">{pop.overview}</div>
                      
                   </div>

                    
                </div></Link>
            ))
        }
        </div>
        <div className="tv-title">On Air </div>
        <div className="tv-popular">
        {
            onair.map((pop)=>(
                <Link to={`Tvdisplay/${pop.id}`}>
                <div className="card" >
                   <div className="content_img">
                   <img src={`https://image.tmdb.org/t/p/original${pop.poster_path}`}/>
                    {/* <div className="card-img" style={{backgroundImage: ` url(https://image.tmdb.org/t/p/original${pop.poster_path})`}}></div> */}
                    <div className="hov">{pop.overview}</div>
                      
                   </div>

                    
                </div></Link>
            ))
        }
        </div>
        <div className="tv-title">Top Rated</div>
        <div className="tv-popular">
        {
            toprated.map((pop)=>(
                <Link to={`Tvdisplay/${pop.id}`}>
                <div className="card" >
                   <div className="content_img">
                   <img src={`https://image.tmdb.org/t/p/original${pop.poster_path}`}/>
                    {/* <div className="card-img" style={{backgroundImage: ` url(https://image.tmdb.org/t/p/original${pop.poster_path})`}}></div> */}
                    <div className="hov">{pop.overview.slice(0,343)}</div>
                      
                   </div>

                    
                </div></Link>
            ))
        }
        </div>
      </div>
    </div>
  );
}
