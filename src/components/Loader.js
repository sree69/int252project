import React from 'react'
import '../CSS/loader.css'

function Loader() {
    return (
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader;