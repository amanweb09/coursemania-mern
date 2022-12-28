import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { courses } from '../constants/courses'
import { CheckIcon, PlayCircleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { getCourseById } from '../api'
import Loading from '../components/shared/Loading'

const MyCourse = () => {

    const { _id } = useParams()

    const { user } = useSelector((state) => state.auth)

    const [course, setCourse] = useState(null)

    useEffect(() => {

        async function fetchCourseById() {

            try {
                const { data } = await getCourseById(_id)
                const currentCrs = user.enrolledCourses.find((c) => { return c.course._id == _id })

                const __course = {
                    ...currentCrs,
                    course: data.course
                }

                setCourse(__course)

            } catch (error) {
                console.log(error);
                alert('course could not be loaded...')
            }
        }

        fetchCourseById()

    }, [])

    const navigate = useNavigate()

    function startVideoStream(vid) {
        navigate('/video/' + vid)
    }


    if (!course) {
        return <Loading />
    }

    return (
        <div className='container mx-auto bg-neutral-50 p-4 sm:p-6'>
            <div className="bg-white p-6 shadow-md m-2 sm:m-6">
                <h1 className='text-xl sm:text-3xl font-black capitalize'>Welcome {user.name}, </h1>
                <span className="text-gray-500 text-sm sm:text-base">Let's continue with your {course.course.title} journey!</span>

                <div>
                    {
                        course.course.modules.map((mod, ix) => {
                            return (
                                <>
                                    {/* {
                                        course.currentModule < ix + 1
                                            ? */}
                                    <div className='relative bg-white shadow-md p-6 my-6 '>
                                        <div className="w-12 h-12 flex-center font-bold text-xl bg-white rounded-full absolute top-4 -left-6 shadow-xl">
                                            {ix + 1}
                                        </div>
                                        <h2 className="font-bold ml-4 capitalize">{mod.title}</h2>
                                        <div className='mt-6'>
                                            {
                                                mod.content.map((vid) => {
                                                    return <div
                                                        onClick={() => startVideoStream(vid._id)}
                                                        className='flex items-center ml-4 my-4 cursor-pointer'>
                                                        {
                                                            user.watchedVideos?.includes(vid.vid)
                                                                ?
                                                                <CheckIcon className='w-8 h-8 text-green-500' />
                                                                :
                                                                <PlayCircleIcon className='h-8 w-8 text-gray-400' />
                                                        }
                                                        <span className='inline-block ml-4 capitalize'>{vid.title}</span>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    {/* :
                                            <div className='relative bg-white shadow-md p-6 my-6'>
                                                <div className="w-12 h-12 flex-center font-bold text-xl bg-white rounded-full absolute top-4 -left-6 shadow-xl">
                                                    {ix + 1}
                                                </div>
                                                <h2 className="font-bold ml-4 capitalize">{mod.title}</h2>
                                                <div className='mt-6'>
                                                    {
                                                        mod.content.map((vid) => {
                                                            return <div
                                                                onClick={() => startVideoStream(vid._id)}
                                                                className='flex items-center ml-4 my-4 cursor-pointer'>
                                                                {
                                                                    user.watchedVideos?.includes(vid.vid)
                                                                        ?
                                                                        <CheckIcon className='w-8 h-8 text-green-500' />
                                                                        :
                                                                        <PlayCircleIcon className='h-8 w-8 text-gray-400' />
                                                                }
                                                                <span className='inline-block ml-4 capitalize'>{vid.title}</span>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>

                                    } */}
                                </>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default MyCourse