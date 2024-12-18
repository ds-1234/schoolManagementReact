import React from 'react'
import {useNavigate } from 'react-router-dom'

function Tile({label , icon , path }) {
    const navigate = useNavigate()
  return (
    <div 
    className="bg-white shadow-lg rounded-lg overflow-hidden w-36 sm:w-1/3 md:w-72 h-auto hover:bg-gray-400 text-gray-800 hover:text-white cursor-pointer transition-transform transform hover:scale-105 md:p-5 "
    onClick={() => navigate(`${path}`)}>
        <img src={icon} alt={label} className="w-full object-cover px-4 sm:py-4 py-1 " />
        <div className="text-center p-2 ">
            <h3 className="text-medium sm:text-lg md:text-xl font-semibold">{label}</h3>
        </div>
    </div>
  )
}

export default Tile