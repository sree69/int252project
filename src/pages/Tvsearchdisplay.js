import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CSS/tvsearchdisplay.css'
import { useNavigate, useParams } from 'react-router-dom'
import Tvnavbar from '../components/Tvnavbar'

export default function Tvsearchdisplay() {
    const {name}=useParams()
    const navigate=useNavigate()
    const [result,setresult]=useState([])
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1&query=${name}&include_adult=true`)
        .then((show)=>{
            
            setresult(show.data.results)
        })
    },[])
    const nav=(id)=>{
        navigate(`/Tvhome/Tvdisplay/${id}`)

    }
  return (
    <div>
        <div>
            <Tvnavbar/>
        </div>
     {
        result==""?
        <div className='sorry'>Sorry no results available</div>
        :
        <div className='tv-s-d-result'>
        {
         result?.map((show)=>(
             <div className='tv-s-d-list' onClick={()=>{nav(show.id)}}>
             <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt=" sorry image not available"/>

         </div>
         ))
        }

     </div>
     }

    </div>
  )
}
