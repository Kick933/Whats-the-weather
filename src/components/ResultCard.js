import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ResultCard({ place }) {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.REACT_APP_KEY}&units=metric`)
                const data = await rawData.json()
                setWeather(data)
            } catch (e) {
                console.log(e.message)
            }
        }
        fetchData()
    }, [place])
    if (weather.cod === 200) {
        return (
            <Link to={`/place/${weather.name}`}>
                <div className="m-4 dark:bg-gray-800 dark:text-indigo-400 dark:shadow-none sm:w-56 sm:h-64 shadow-lg transform hover:-translate-y-1 bg-indigo-300 rounded-2xl text-center p-8 mx-8 sm:py-4 sm:mx-auto">
                    <p className="text-xl font-semibold">{weather.name}</p>
                    <p className="text-lg font-medium text-gray-600 dark:text-indigo-200">{weather.sys.country}</p>
                    <p className="text-sm text-gray-600 dark:text-indigo-200">Temperature</p>
                    <p className="text-base  text-gray-600 dark:text-indigo-200">{weather.main.temp} &#8451;</p>
                    <p className="text-sm text-gray-600 dark:text-indigo-200">Feels like</p>
                    <p className="text-3xl mt-4">{weather.main.feels_like} &#8451;</p>
                    {/* <button className="w-16 bg-red-400 hover:bg-red-500 active:bg-red-600 text-black rounded-sm mt-4">Delete</button> */}
                </div>
            </Link>
        )
    } else {
        return (
            <div className=" dark:bg-gray-800 m-4 dark:shadow-none sm:w-56 sm:h-64 shadow-lg transform hover:-translate-y-1 bg-indigo-300 rounded-2xl text-center p-8 mx-8 sm:py-4 sm:mx-auto">
                <p className="text-xl font-semibold">We are</p>
                <p className="text-xl font-semibold">Loading....</p>
                <p className="text-lg mt-8">Check your</p>
                <p className="text-lg">Internet Connection</p>
            </div>
        )
    }
}

export default ResultCard
