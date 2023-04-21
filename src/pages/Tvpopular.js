import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/tvpopular.css'
import Tvnavbar from './../components/Tvnavbar';

export default function Tvpopular() {
    const type=useParams();
    const navigate=useNavigate();
    console.log(type.name);
    const [popular, setpopular] = useState([]);
    const pass=(id)=>{
      navigate(`/Tvhome/Tvdisplay/${id}`)
    }
    useEffect(()=>{
        axios.get(
            `https://api.themoviedb.org/3/tv/${type.name}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`
          )
          .then((data) => {
            setpopular(data.data.results);
          });
    },[popular])
  return (
    <div>
        <div>
            <Tvnavbar/>
        </div>
        <div className='tv-popular'>
            <div className='tv-pop-grid' >
                {
                    popular.map((pop)=>(
                        <div onClick={()=>{pass(pop.id)}}>
                        <img src={`https://image.tmdb.org/t/p/original${pop.poster_path}`}/>

                        </div>
                    ))
                }
            </div>


        </div>
    </div>
  )
}
