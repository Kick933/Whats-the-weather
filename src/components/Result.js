import React from 'react'
import ResultCard from './ResultCard'

function Result({ place, deleteResult }) {
    return (
        <div className='flex flex-row gap-8 p-2 w-screen justify-center flex-wrap'>
            {place.length ? place.map(place => <ResultCard key={place.searchName} place={place} deleteResult={deleteResult} />) : <p className="m-16 sm:mx-auto text-center text-xl text-indigo-400">No Location added. Search for your location now.</p>}
        </div>
    )
}

export default React.memo(Result)
