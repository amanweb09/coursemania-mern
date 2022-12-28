import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const MainCourseCard = ({ image, title, desc, _id, price, rating, navigateTo, btnText = "View Details" }) => {

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(navigateTo ? navigateTo : `/details/${_id}`)}
            className='bg-white transition-all shadow-md px-6 py-4 sm:mx-2 cursor-pointer hover:scale-105 rounded-md h-80 w-full flex-center flex-col'>
            <img
                className='h-24'
                src={image}
                alt="course image" />
            <h3 className='font-bold text-xl mt-4'>{title}</h3>
            <p className='text-gray-600 text-sm text-center'>
                {desc}
            </p>
            <div className="flex items-center my-2">
                {
                    new Array(rating || 5)
                        .fill('')
                        .map((star, ix) => {
                            return <StarIcon className='text-yellow-500 h-6 w-6' key={ix} />
                        })
                }
            </div>
            <span className="text-red-800 font-bold">&#8377;{price}</span>
            <button className='w-48 h-10 bg-red-800 text-white mt-4'>
                {btnText}
            </button>
        </div>
    )
}

export default MainCourseCard