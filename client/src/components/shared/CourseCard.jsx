import React from 'react'

const CourseCard = ({ image, title, desc, id }) => {
    return (
        <div className='bg-yellow-100 px-6 py-4 mx-2 cursor-pointer hover:bg-yellow-200 rounded-md h-80 w-full flex-center flex-col'>
            <img
                className='h-32'
                src={image}
                alt="course image" />
            <h3 className='font-bold text-xl mt-4'>{title}</h3>
            <p className='text-gray-600 text-sm text-center'>
                {desc}
            </p>
            <button className='w-48 h-10 bg-red-800 text-white mt-4'>View Details</button>
        </div>
    )
}

export default CourseCard