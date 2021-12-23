import React from 'react'
import HourlyCard from './HourlyCard'
import { v4 } from 'uuid'

function HorizontalFlex({ hourly, text }) {
    return (
        <>
            <p className="text-2xl dark:text-indigo-500">{text}</p>
            <div className="w-full flex m-4 md:px-8 overflow-x-scroll ">{hourly.map(item => <HourlyCard key={v4()} data={item} />)}</div>
        </>
    )
}

export default HorizontalFlex

