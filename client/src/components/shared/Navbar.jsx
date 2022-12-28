import React, { useState } from 'react'
import { BookOpenIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [showSideBar, setShowSideBar] = useState(false)

  const navigate = useNavigate()

  return (
    <>
      <div className="container overflow-hidden py-4 mx-auto bg-yellow-50 text-center font-bold w-full sm:text-base text-sm">Courses Start @ Just Rs.499!</div>

      <div className='w-full bg-white sm:px-0 px-4 flex items-center justify-between my-4 container mx-auto'>
        <NavLink to={'/'}>
          <div className="flex items-center">
            {/* <BookOpenIcon className='text-red-800 h-8 w-8 sm:h-12 sm:w-12 mr-2' /> */}
            <img 
            className='h-6 sm:h-10 bg-yellow-100 rounded-full'
            src="/logo.png" 
            alt="logo" />
            <span className='font-black text-lg sm:text-xl'>Course<span className="text-red-800">Mania</span></span>
          </div>
        </NavLink>

        <div
          onClick={() => setShowSideBar(true)}
          className="flex-center flex-col mr-4 sm:hidden">
          <div className="w-6 h-1 bg-black"></div>
          <div className="w-6 h-1 bg-black my-1"></div>
          <div className="w-6 h-1 bg-black"></div>
        </div>

        {
          showSideBar && (
            <div
              style={{ zIndex: '9999' }}
              className='w-screen sm:hidden h-screen fixed inset-0 bg-white flex-center flex-col'>
              <div
                className="flex-center flex-col">
                <XMarkIcon
                  onClick={() => setShowSideBar(false)}
                  className='absolute top-2 left-2 text-black w-10 h-10 cursor-pointer hover:text-red-500' />
                <NavLink
                  to={'/'}
                  onClick={() => setShowSideBar(false)}
                  className={'hover:text-red-800 '}>Home </NavLink>
                <NavLink
                  to={'/courses'}
                  onClick={() => setShowSideBar(false)}
                  className={'hover:text-red-800 sm:my-0 my-4'}>Courses </NavLink>
                <NavLink
                  to={'/'}
                  onClick={() => setShowSideBar(false)}
                  className={'hover:text-red-800 '}>About </NavLink>
                <NavLink
                  to={'/'}
                  onClick={() => setShowSideBar(false)}
                  className={'hover:text-red-800 sm:my-0 my-4'}>Blogs </NavLink>
                <NavLink
                  to={'/my-library'}
                  onClick={() => setShowSideBar(false)}
                  className={'hover:text-red-800'}>My Library </NavLink>
              </div>

              <button
                onClick={() => {
                  setShowSideBar(false)
                  navigate('/register')
                }}
                className='px-6 py-2 border-2 my-6 border-solid border-red-800 mx-4 w-32'>Register</button>
              <button
                onClick={() => {
                  setShowSideBar(false)
                  navigate('/login')
                }}
                className='px-6 py-2 bg-red-800 text-white border-2 border-solid w-32 border-red-800'>Login</button>
            </div>
          )
        }

        <div className="sm:flex items-center hidden">
          <NavLink to={'/'} className={'hover:text-red-800 '}>Home </NavLink>
          <NavLink to={'/courses'} className={'hover:text-red-800 mx-4'}>Courses </NavLink>
          <NavLink to={'/'} className={'hover:text-red-800 '}>About </NavLink>
          <NavLink to={'/'} className={'hover:text-red-800 mx-4'}>Blogs </NavLink>
          <NavLink to={'/my-library'} className={'hover:text-red-800 '}>My Library </NavLink>

          <button
            onClick={() => navigate('/register')}
            className='px-6 py-2 border-2 border-solid border-red-800 mx-4 w-32'>Register</button>
          <button
            onClick={() => navigate('/login')}
            className='px-6 py-2 bg-red-800 text-white border-2 border-solid w-32 border-red-800'>Login</button>
        </div>
      </div>
    </>
  )
}

export default Navbar