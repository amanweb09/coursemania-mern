import React, { useState } from 'react'
import MyCourseCard from '../components/courses/MyCourseCard'
// import { courses as myCourses } from '../constants/courses'
import { useSelector } from 'react-redux'

const MyLibrary = () => {

    const { user } = useSelector((state) => state.auth)

    return (
        <div className='container mx-auto bg-neutral-50 p-4 sm:p-6'>
            <div className="p-2 sm:p-6">
                <h1 className='font-extrabold text-xl my-6'>Your Courses</h1>

                <div className=''>
                    {
                        user?.enrolledCourses.map((crs) => {
                            return <MyCourseCard
                                key={crs.course._id}
                                _id={crs.course._id}
                                image={crs.course.image}
                                title={crs.course.title}
                                enrolledOn={crs.course.enrolledOn}/>
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default MyLibrary