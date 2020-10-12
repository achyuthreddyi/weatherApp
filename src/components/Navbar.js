import React from 'react'
import './navbar.css'

function Navbar( {changeRegion, updateWeather} ) {
    const changeWeather = (e)=>{
        updateWeather(e)
        
    }
    return (
        <div>
            <h1 className=" weatherTitle"> Weather App </h1>
            <div className= "col-md-6">
                <form className="region" onSubmit = { (e) =>  changeWeather(e)} >
                    <input className="regionInput" placeholder="Enter Location " onChange = {(e) =>{
                        // console.log(e.target.value);
                        changeRegion( e.target.value )

                    }} />

                </form>
            </div>
          
        </div>
    )
}

export default Navbar
