import React from 'react'
import { dateConvert } from '../helpers/dateConvert'

function HourlyCard({ data }) {
    const { temp, uvi, dt, pressure, visibility, humidity } = data
    const datetime = dateConvert(dt)
    const date = datetime.split(',')[1].split('/').slice(0, 2).join('/')
    const time = datetime.split(',')[0].split(':').slice(0, 2).join(':')
    console.log(time)
    return (
        <div className="dark:bg-gray-700 dark:text-white bg-indigo-300 p-2 flex-shrink-0 flex items-center flex-col h-56 w-48 text-gray-800 rounded-xl m-1 md:mx-4 overflow-hidden">
            <div className="rounded-xl flex justify-around bg-gray-300 dark:bg-gray-500 w-full text-center h-6">
                <p>{time}</p>
                <p>{date}</p>
            </div>
            <div className="border-b-2 border-gray-500 flex justify-between w-full text-center h-10 items-center">
                <p>Temperature</p>
                <p>{temp} &#8451;</p>
            </div>
            <div className="border-b-2 border-gray-500 flex justify-between w-full text-center h-10 items-center">
                <p>Pressure</p>
                <p>{pressure} MB</p>
            </div>
            <div className="border-b-2 border-gray-500 flex justify-between w-full text-center h-10 items-center">
                <p>Humidity</p>
                <p>{humidity} %</p>
            </div>
            <div className="border-b-2 border-gray-500 flex justify-between w-full text-center h-10 items-center">
                <p>UV Index</p>
                <p>{uvi}</p>
            </div>
            <div className="rounded-xl border-gray-500 flex justify-between w-full text-center h-10 items-center">
                <p>Visibility</p>
                <p>{(visibility / 1000).toFixed(1)} KM  </p>
            </div>
        </div>
    )
}

export default HourlyCard
