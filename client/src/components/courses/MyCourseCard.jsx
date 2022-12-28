import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const MyCourseCard = ({ _id, image, title, enrolledOn }) => {

    const navigate = useNavigate()

    function openCourse() {
        navigate(`/my-courses/` + _id)
    }

    return (
        <div className='w-full p-6 flex sm:flex-row flex-col items-center justify-start my-6 bg-white shadow-md'>
            <img
                src={image}
                className="w-20 sm:w-10"
                alt="image" />

            <div className='flex flex-col justify-start sm:w-96 sm:ml-6'>
                <h1 className='font-bold sm:text-left text-center sm:mt-0 mt-4'>{title}</h1>
                <span className='w-full sm:w-max text-center sm:mt-0 mt-6 sm:text-left text-gray-600 sm:text-base text-sm'>
                    {moment(enrolledOn).format('DD MMMM YYYY')}
                </span>
            </div>

            <div className='text-sm'>
                <span className='inline-block sm:block'>Valid for: </span>
                <span>6 months</span>
            </div>

            <div className='flex sm:w-max w-full sm:mt-0 mt-4'>
                <button
                    onClick={openCourse}
                    className='w-24 sm:ml-28 h-10 text-green-600 bg-green-200 rounded-full'>
                    Open
                </button>
                <button className='w-40 ml-6 h-10 text-indigo-600 bg-indigo-200 rounded-full'>
                    Assignments
                </button>
            </div>

        </div>
    )
}

export default MyCourseCard