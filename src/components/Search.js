import React, { useState } from 'react'
import { getWeather } from '../helpers/getWeather'
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../state/placeList'
function Search() {
    const place = useSelector(state => state.weather.placeList)

    const dispatch = useDispatch()

    const [location, setLocation] = useState('Enter your city')

    let searching = false
    const submitChange = (e) => {
        e.preventDefault()
        const term = location
        setLocation('Searching...')
        if (searching) alert("Already processing a query.")
        searching = true

        const checkDuplicates = () => {
            if (!place.length) return true
            const arr = place.filter(item => item.searchName.toLowerCase() !== term.toLowerCase())
            if (arr.length === place.length) return true
            alert("You are searching for a duplicate.")
        }
        const fetchData = () => (
            getWeather(term)
                .then(res => {
                    if (res.cod === 200) {
                        if (checkDuplicates()) {
                            dispatch(add({
                                searchName: term.split('').map((a, i) => i === 0 ? a.toUpperCase() : a.toLowerCase()).join(''),
                                weather: res,
                                status: 'Fulfilled'
                            }))
                        }
                        return true
                    }
                })
                .catch(e => console.log(e.message))
        )
        const addLocation = async () => {
            const val = await fetchData()
            if (val) {
                setLocation("Saving the place...")
                setTimeout(() => { setLocation("Enter your city") }, 250)
            } else {
                alert("No such place found.")
                setLocation('Enter your city')
            }
        }
        addLocation()
    }

    const handleFocus = e => {
        const target = e.target
        if (target.value === "Enter your city") {
            setLocation('')
        } else if (target.value === "Searching...") {
            setLocation('')
        }
    }

    const handleBlur = e => {
        const target = e.target
        if (target.value === '') {
            setLocation('Enter your city')
        } else if (target.value === 'Saving the place...') {
            setLocation("Enter your city")
        }
    }

    return (
        <form onSubmit={(e) => submitChange(e)}>
            <input onFocus={e => handleFocus(e)} onBlur={e => handleBlur(e)} className="h-16 w-64 text-center md:w-96 dark:bg-black border-blue-300 dark:border focus:outline-none text-lg font-medium dark:focus:bg-gray-800 focus:bg-gray-200 transform hover:-translate-y-0.5 text-indigo-500 my-4 p-4 shadow-md focus:border-2 bg-gray-200 rounded-xl mx-auto block" type='text' value={location} onChange={(e) => setLocation(e.target.value)}></input>
        </form>

    )
}

export default Search
