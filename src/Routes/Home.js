import React from 'react'
import Search from "../components/Search";
import Result from "../components/Result";

function Home({ setPlace, place }) {
    return (
        <div className='min-h-screen w-full overflow-y-hidden bg-white dark:bg-gray-900 dark:text-white'>
            <Search setPlace={setPlace} place={place} />
            <Result place={place} />
        </div>
    )
}

export default Home
