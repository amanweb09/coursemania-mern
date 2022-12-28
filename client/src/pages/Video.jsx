import React from 'react'
import { PlayIcon, UserCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { comments } from '../constants/comments'
import { useParams } from 'react-router-dom'

const Video = () => {

  const { _id } = useParams();

  return (
    <div className='container mx-auto bg-neutral-50 pb-20 relative'>

      <header className='w-full py-2 sm:py-4 bg-white px-4 border-b-2 border-b-solid border-b-red-800'>
        <h1 className='text-xl flex font-black my-4'>
          <PlayIcon className='w-6 h-6 text-black' />
          React.js Basics
        </h1>
      </header>

      <div className='w-full sm:px-0 px-4 sm:flex-row flex-col flex mt-6'>

        <video
          src={`http://localhost:3100/api/video/${_id}`}
          type="video/mp4"
          style={{ width: '55rem' }}
          className='block'
          autoPlay
          controls />

        <div className="bg-white p-4 mx-2 sm:mt-0 mt-6 sm:py-0 py-6 sm:mx-4 shadow-md flex-1 relative">
          <h1 className="font-bold text-xl">Comments</h1>
          <div>
            {
              comments.map((comment) => {
                return (
                  <div
                    className='my-4'
                    key={comment._id}>
                    <div className='flex items-center'>
                      <UserCircleIcon className='w-8 h-8 text-gray-300' />
                      <span className='font-semibold capitalize ml-2'>{comment.commenter.name}</span>
                    </div>
                    <p className='ml-10'>{comment.comment}</p>
                  </div>
                )
              })
            }
          </div>

          <div className='absolute bottom-0 h-8 left-0 w-full flex'>
            <input
              placeholder='comment here..'
              type='text'
              className="flex-1 border border-gray-300 p-2" />
            <button className='w-8 h-8 bg-black text-white flex-center rounded-full'>
              <ArrowRightIcon className='w-6 h-6 text-white' />
            </button>
          </div>

        </div>
      </div>

      <footer className='absolute bottom-0 left-0 py-1 text-sm w-full bg-black text-white text-center'>
        CourseMania &copy; || All Rights Reserved
      </footer>
    </div>
  )
}

export default Video