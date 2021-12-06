import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchOneCall } from '../helpers/oneCall'

function DetailedWeather() {
    const { name } = useParams()
    const [oneCall, setOneCall] = useState(null)
    document.title = `${name} Weather`
    const navigate = useNavigate()
    const [place] = useSelector(state => state.weather.placeList.filter(item => item.searchName.toLowerCase() === name.toLowerCase()))
    if (place.weather && place.weather.hasOwnProperty('coord') && !oneCall) {
        const lat = place.weather.coord.lat
        const lon = place.weather.coord.lon
        fetchOneCall(lat, lon)
            .then(res => setOneCall(res))
            .catch(err => console.log(err.message))
    }
    if (!oneCall) {
        return (
            <div className="min-w-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-indigo-500 flex flex-col justify-center items-center">
                <p className="text-xl font-medium block w-full text-center">Loading...</p>
                <p className="text-xl font-medium block w-full text-center">Please wait....</p>
            </div>
        )
    } else {
        return (
            <div className="min-w-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-indigo-500 flex flex-col p-2 justify-start items-center">
                <h1 className="m-4 text-4xl font-serif font-extrabold">{place.searchName}, {place.weather.sys.country}</h1>
                <h2 className="m-8 text-xl">This Page is under cosntruction. Check back later.</h2>
                <button onClick={() => navigate('/')} className="bg-red-400 dark:bg-blue-400 hover:bg-red-500 dark:hover:bg-blue-500 active:bg-red-600 dark:active:bg-blue-600 my-4 text-black w-20 block mx-auto rounded-xl p-2">Go Back</button>
            </div>
        )
    }

}

export default DetailedWeather
