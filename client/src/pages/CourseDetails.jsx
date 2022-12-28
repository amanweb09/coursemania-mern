import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StarIcon, UserCircleIcon, GlobeAltIcon, CheckIcon } from '@heroicons/react/24/solid'
import { getCourseById } from '../api'
import Loading from '../components/shared/Loading'

const CourseDetails = () => {

  const { _id } = useParams()
  const [course, setCourse] = useState(null)


  useEffect(() => {
    //request on server
    async function getCourse() {
      try {
        const { data } = await getCourseById(_id)
        console.log(data.course.instructor.profilePicture)
        setCourse(data.course)
      } catch (error) {
        console.log(error);
      }
    }

    getCourse()

  }, [])

  const navigate = useNavigate()

  if (!course) {
    return <Loading />
  }

  return (
    <div className='container mx-auto bg-neutral-50 sm:px-4 pt-2'>
      <header className='text-black p-4 sm:p-10 flex sm:flex-row flex-col justify-between items-center mt-2 sm:mt-6'>

        <div className='bg-white p-8 shadow-md w-full sm:w-1/2'>
          <h1 className="font-extrabold text-2xl">{course.title}</h1>
          <p className='text-gray-600 mt-2'>{course.desc}</p>
          <div className="flex mt-2">
            {
              new Array(course.rating)
                .fill('')
                .map((star, ix) => {
                  return <StarIcon
                    key={ix}
                    className='h-6 w-6 text-yellow-500' />
                })
            }
          </div>

          <div className="font-bold text-2xl my-6 text-yellow-800">&#8377;{course.price}</div>

          <div className="text-sm mt-8">
            Instructor Details: <br />
            <div className="flex items-center mt-2">
              {
                course.instructor.profilePicture
                  ?
                  <img 
                  className='w-8 h-8 rounded-full mr-2'
                  src={'/images/'+course.instructor.profilePicture} alt="profile" />
                  :
                  <UserCircleIcon className='h-8 w-8 text-gray-500' />
              }
              <span className=''>
                {course.instructor.name}
              </span>

            </div>
          </div>

          <div className="flex items-center mt-8">
            <GlobeAltIcon className=' h-6 w-6' />
            <span>English</span>
          </div>

          <button
            onClick={() => navigate(`/payment/${course._id}`)}
            className="bg-yellow-200 font-bold hover:bg-yellow-300 w-64 mt-6 h-12">
            Enroll now
          </button>
        </div>

        <div className="mr-10">
          <img 
          src={course.image} 
          alt="image" 
          className='w-48 sm:mt-0 mt-6 sm:w-80' />
        </div>

      </header>

      <section className='bg-white p-8 my-6 mt-6 rounded-md'>
        <h1 className="font-bold text-xl">What You'll Learn</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 sm:mt-0 mt-4 items-center justify-center'>
          {
            course.details.map((detail) => {
              return <div className='flex items-center capitalize p-2 sm:p-4'>
                <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
                <span>{detail}</span>
              </div>
            })
          }
        </div>
      </section>

      <section className='bg-white p-8 my-6 mt-6 rounded-md'>
        <h1 className="font-bold text-xl">Course Content</h1>

        <div className="flex items-center">
          <span className='text-sm font-semibold mt-4'>{course.modules.length} Modules</span>
          <span className='text-sm font-semibold mt-4 ml-6 text-gray-700'>{course.length} hours</span>
        </div>

        <div className=''>
          {
            course.modules.map((module) => {
              return (
                <div className='bg-neutral-100 w-full mr-4 sm:mr-0 sm:w-96 p-4 my-4'>
                  <div className='flex items-center capitalize'>
                    <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
                    <span>{module.title}</span>
                  </div>
                  <ul className='ml-8 mt-4 text-gray-700 capitalize'>
                    {
                      module.content.map((cont) => {
                        return (
                          <li className='my-1'>{cont.title}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
            })
          }
        </div>
      </section>

      <section className='bg-white p-8 my-6 mt-6 rounded-md'>
        <h1 className='font-bold text-xl capitalize'>
          What will you get with this course?
        </h1>
        <div className='flex items-center capitalize my-4'>
          <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
          <span>{course.length}+ learning</span>
        </div>
        <div className='flex items-center capitalize'>
          <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
          <span>Learn from the best educators</span>
        </div>
        <div className='flex items-center capitalize my-4'>
          <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
          <span>Certificate of completion</span>
        </div>
        <div className='flex items-center capitalize'>
          <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
          <span>10 days money-back guarantee</span>
        </div>
        <div className='flex items-center capitalize my-4'>
          <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
          <span>Doubt Solving</span>
        </div>
        <div className='flex items-center capitalize'>
          <CheckIcon className='w-6 h-6 mr-1 text-green-600' />
          <span>Test after every module</span>
        </div>
      </section>

      <section className='bg-white p-8 my-6 mt-6 rounded-md'>
        <h1 className='font-bold text-xl'>Requirements</h1>
        <ul>
          <li className='flex items-center my-2'>
            <div className="w-2 h-2 mr-2 border border-black rounded-full"></div>
            <span>Windows/Mac/Linux</span>
          </li>
          <li className='flex items-center my-2'>
            <div className="w-2 h-2 mr-2 border border-black rounded-full"></div>
            <span>Good internet connection</span>
          </li>
        </ul>
      </section>

      <footer className='bg-black w-full text-center py-2 text-white'>
        Course Mania &copy; || All Rights Reserved
      </footer>
    </div>
  )
}

export default CourseDetails