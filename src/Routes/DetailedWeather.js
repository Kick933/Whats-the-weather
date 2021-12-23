import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchOneCall } from '../helpers/oneCall'
import { dateConvert } from '../helpers/dateConvert'
import HorizontalFlex from '../components/HorizontalFlex'

function DetailedWeather() {
    const { name } = useParams()
    const [oneCall, setOneCall] = useState(null)
    const [subscribed, setSubscribed] = useState(true)
    document.title = `${name} Weather`
    const navigate = useNavigate()
    const [place] = useSelector(state => state.weather.placeList.filter(item => item.searchName.toLowerCase() === name.toLowerCase()))
    // Fetch OneCall data
    useEffect(() => {
        if (place === undefined || place.weather === undefined) {
            navigate('/')
        } else if (place.status === 'Fulfilled' && !oneCall) {
            const lat = place.weather.coord.lat
            const lon = place.weather.coord.lon
            fetchOneCall(lat, lon)
                .then(res => { if (subscribed) setOneCall(res) })
                .catch(err => console.log(err.message))
        }
        return () => {
            setSubscribed(false)
        }
    }, [place, navigate, oneCall, subscribed])

    if (place !== undefined && place.weather !== undefined && place.status === 'Fulfilled') {
        const placeName = place.searchName.split('').map((text, index) => index === 0 ? text.toUpperCase() : text).join('')
        const country = place.weather.sys.country
        const lastUpdated = dateConvert(place.weather.dt)
        const sunset = dateConvert(place.weather.sys.sunset).split(',')[0]
        const sunrise = dateConvert(place.weather.sys.sunrise).split(',')[0]
        const temp = place.weather.main.temp
        const feels = place.weather.main.feels_like
        const humidity = place.weather.main.humidity
        const pressure = place.weather.main.pressure
        return (
            <div className="min-w-full min-h-screen bg-gray-200 dark:bg-gray-900 text-black dark:text-indigo-500 flex flex-col p-2 justify-start items-center">
                <h1 className="m-4 text-4xl font-serif font-extrabold">{placeName}, {country}</h1>
                {/* <h1 className="m-4 text-xl font-serif font-extrabold">{place.weather.weather[0].description}</h1> */}
                <p className=" text-gray-500 text-sm">Last Updated:{lastUpdated}</p>
                <div className=" justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-screen">
                    <div className='p-4 mx-auto w-56 sm:w-48 flex flex-col items-center'>
                        <p className='border-b-2 border-gray-500 self-start font-serif m-1 text-lg w-min text-gray-700 dark:text-indigo-400'>Temperature</p>
                        <p className='text-3xl m-3 text-center'>{temp}  &#8451;</p>
                    </div>
                    <div className='p-4 mx-auto w-56 sm:w-48 flex flex-col  items-center'>
                        <p className='border-b-2 border-gray-500 self-start font-serif m-1 text-lg w-min text-gray-700 dark:text-indigo-400'>Feels</p>
                        <p className='text-3xl m-3 text-center'>{feels}  &#8451;</p>
                    </div>
                    <div className='p-4 mx-auto w-56 sm:w-48 flex flex-col  items-center'>
                        <p className='border-b-2 border-gray-500 self-start font-serif m-1 text-lg w-min text-gray-700 dark:text-indigo-400'>Humidity</p>
                        <p className='text-3xl m-3 text-center'>{humidity}%</p>
                    </div>
                    <div className='p-4 mx-auto w-56 sm:w-48 flex flex-col  items-center'>
                        <p className='border-b-2 border-gray-500 self-start font-serif m-1 text-lg w-min text-gray-700 dark:text-indigo-400'>Pressure</p>
                        <p className='text-3xl m-3 text-center'>{pressure} MB</p>
                    </div>
                    <div className='p-4 mx-auto w-56 sm:w-48 flex flex-col  content-start'>
                        <p className='border-b-2 border-gray-500 self-start font-serif m-1 text-lg w-min text-gray-700 dark:text-indigo-400'>Sunrise</p>
                        <p className='text-3xl m-3 text-center'>{sunrise}</p>
                    </div>
                    <div className='p-4 mx-auto w-56 sm:w-48 flex flex-col  items-center'>
                        <p className='border-b-2 border-gray-500 self-start font-serif m-1 text-lg w-min text-gray-700 dark:text-indigo-400'>Sunset</p>
                        <p className='text-3xl m-3 text-center'>{sunset}</p>
                    </div>
                </div>
                {!oneCall ? null : <HorizontalFlex hourly={oneCall.hourly} text="Hourly Forecast" />}
                <button onClick={() => navigate('/')} className="bg-red-400 dark:bg-blue-400 hover:bg-red-500 dark:hover:bg-blue-500 active:bg-red-600 dark:active:bg-blue-600 my-4 text-black w-20 block mx-auto rounded-xl p-2">Go Back</button>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }

}

export default DetailedWeather
