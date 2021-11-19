import React, { useState } from 'react'

function Search({ setPlace, place }) {
    const [location, setLocation] = useState('Enter your city')

    const submitChange = (e) => {
        e.preventDefault()
        const fetchData = async () => {
            try {
                const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_KEY}&units=metric`)
                const data = await rawData.json()
                if (data.cod === 200) {
                    return true
                }
            } catch (e) {
                console.log(e.message)
            }
        }
        const checkDuplicates = () => {
            if (!place.length) return true
            console.log(place)
            const arr = place.filter(item => item !== location)
            if (arr.length === place.length) return true
        }
        const addLocation = async () => {
            const val = await fetchData()
            if (checkDuplicates() & val) {
                setPlace(t => {
                    return [
                        ...t,
                        location
                    ]
                })
            }
        }
        addLocation()

    }
    const handleFocus = e => {
        const target = e.target
        if (target.value === "Enter your city") {
            setLocation('')
        } else if (target.value === '') {
            setLocation('Enter your city')
        }
    }

    return (
        <form onSubmit={(e) => submitChange(e)}>
            <input onFocus={e => handleFocus(e)} onBlur={e => handleFocus(e)} className="dark:bg-black focus:outline-none text-lg font-medium dark:focus:bg-gray-800 focus:bg-gray-200 focus:border-4 transform hover:-translate-y-0.5 text-indigo-500 my-4 p-4 shadow-lg focus:border-blue-300 bg-gray-300 rounded-xl mx-auto block" type='text' value={location} onChange={(e) => setLocation(e.target.value)}></input>
        </form>

    )
}

export default Search
