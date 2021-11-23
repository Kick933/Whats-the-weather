import React from 'react'
import Search from "../components/Search";
import Result from "../components/Result";

function Home({ setPlace, place, deleteResult }) {
    document.title = "What's the Weather?"
    return (
        <div className='min-h-screen w-full overflow-y-hidden bg-gray-100 dark:bg-gray-900 dark:text-white'>
            <Search setPlace={setPlace} place={place} />
            <Result place={place} deleteResult={deleteResult} />
        </div>
    )
}

export default Home
