import React from 'react'
import { useNavigate } from 'react-router-dom'

function DetailedWeather() {
    const navigate = useNavigate()
    return (
        <div className="min-w-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-indigo-500 flex flex-col justify-center align-middle">
            <p className="text-xl font-medium block w-full text-center">This Page is under construction.</p>
            <p className="text-xl font-medium block w-full text-center">Check back later.</p>
            <button onClick={() => navigate('/')} className="bg-red-400 dark:bg-blue-400 hover:bg-red-500 dark:hover:bg-blue-500 active:bg-red-600 dark:active:bg-blue-600 my-4 text-black w-20 block mx-auto rounded-xl p-2">Go Back</button>
        </div>
    )
}

export default DetailedWeather
