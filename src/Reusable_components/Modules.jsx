import React from 'react'
import { NavLink } from 'react-router-dom'
import Tile from './Tile.jsx'

function Modules({modules}) {
  console.log("modules" , modules);
  
  return (
    <div className='flex flex-wrap items-center justify-center mt-10 sm:mt-14 mb-5 gap-5'>
      {modules.length>0 && (
        modules.map((module) => (
          <Tile 
          key={module.label}
          label={module.label} 
          icon={module.icon} 
          path={module.path} 
          />
        ))
      )}
    </div>
  )
}

export default Modules