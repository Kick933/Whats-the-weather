import React from 'react'
import ResultCard from './ResultCard'

function Result({ place }) {
    return (
        <div className='flex flex-row gap-4 w-screen justify-center flex-wrap'>
            {place.map(place => <ResultCard key={place} place={place} />)}
        </div>
    )
}

export default Result
