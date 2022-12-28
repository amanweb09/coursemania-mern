import React from 'react'

const Loading = () => {

    return (
        <div className="w-full flex-center py-8">
            <div className="shadow-xl w-16 h-16 rounded-full flex-center">
                <div
                    className="w-14 h-14 border-4 border-solid border-r-red-800 border-l-transparent border-y-red-800 rounded-full loading">

                </div>
            </div>
        </div>
    )
}

export default Loading