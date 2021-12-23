import React from 'react'

function Loading() {
    return (
        <>
            <div className="flex items-center justify-center space-x-2 py-10 min-w-screen min-h-screen dark:bg-gray-800 ">
                <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-8 h-8 bg-red-400 rounded-full animate-bounce"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
        </>
    )
}

export default Loading
