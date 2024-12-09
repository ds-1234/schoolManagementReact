import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddBtn({onAddClick}) {
  return (
    <div className='group'>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1 bg-green-500 text-white rounded-full transition-all duration-300 h-12 px-3 text-2xl w-12 absolute bottom-0 top-24 right-5 xl:right-10 group-hover:w-24 group-hover:px-4 group-hover:text-xl"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add
          </span>
        </button>
      </div>
  )
}

export default AddBtn