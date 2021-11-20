import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ResultCard({ place, deleteResult }) {
    const [weather, setWeather] = useState({})

    function handleDelete(e) {
        e.stopPropagation()
        deleteResult(place)
    }
    useEffect(() => {
        let isSubscribed = true
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.REACT_APP_KEY}&units=metric`)
            .then(res => res.json())
            .then(res => (isSubscribed ? setWeather(res) : null))
            .catch(err => console.log(err.message))

        return () => (isSubscribed = false)
    }, [place])
    if (weather.cod === 200) {
        return (
            <Link to={`/place/${weather.name}`}>
                <div className="w-64 h-96 sm:m-4 dark:bg-gray-800 dark:text-indigo-400 dark:shadow-none sm:w-56 sm:h-64 shadow-lg transform hover:-translate-y-1 bg-indigo-300 rounded-2xl text-center flex flex-col justify-center sm:mx-auto">
                    <p className="text-xl block font-semibold">{weather.name}</p>
                    <p className="text-lg font-medium text-gray-600 dark:text-indigo-200">{weather.sys.country}</p>
                    <p className="text-sm text-gray-600 dark:text-indigo-200">Temperature</p>
                    <p className="text-base  text-gray-600 dark:text-indigo-200">{weather.main.temp} &#8451;</p>
                    <p className="text-sm text-gray-600 dark:text-indigo-200">Feels like</p>
                    <p className="text-3xl mt-4">{weather.main.feels_like} &#8451;</p>
                    {/* <button className="w-24 bg-red-400 hover:bg-red-500 active:bg-red-600 text-black rounded-sm mx-auto mt-4" onClick={handleDelete}>Delete</button> */}
                </div>
            </Link>
        )
    } else {
        return (
            <div className="w-1/2 h-60 dark:bg-gray-800 m-4 dark:shadow-none sm:w-56 sm:h-64 shadow-lg transform hover:-translate-y-1 bg-indigo-300 rounded-2xl text-center p-8 mx-8 sm:py-4 sm:mx-auto">
                <p className="text-xl font-semibold">We are</p>
                <p className="text-xl font-semibold">Loading....</p>
                <p className="text-lg mt-8">Check your</p>
                <p className="text-lg">Internet Connection</p>
            </div>
        )
    }
}

export default ResultCard
