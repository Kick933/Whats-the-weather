import React from 'react'
import { Link } from 'react-router-dom'
import {FiMoon} from 'react-icons/fi'
function Nav() {

    function changeTheme() {
        if (document.documentElement.classList.contains('dark')) {
            localStorage.theme = null
        } else {
            localStorage.theme = 'dark'
        }
        document.documentElement.classList.toggle('dark')
    }

    return (
        <div className="bg-indigo-300 dark:bg-gray-800 dark:opacity-90 justify-between items-center px-4  flex h-16 dark:text-gray-50 text-gray-900">
            <h1 className="text-center text-xl font-bold font-serif"><Link to="/">What's The Weather</Link></h1>
            <div onClick={() => changeTheme()} className="transition-delay-400 transition-all cursor-pointer text-3xl text-black dark:text-yellow-400 w-8 h-8"><FiMoon /></div>
        </div>
    )
}

export default Nav
