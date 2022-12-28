import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { register } from '../api'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'

const Register = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [user, setUser] = useState({ name: '', email: '', password: '' })

    function setDetails(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const notify = (text, type) => toast(text, { type, theme: 'light', autoClose: 1400 })

    async function handleRegistration(e) {
        e.preventDefault()

        if (!user.name || !user.email || !user.password) {
            return notify('All fields are required!', 'error')
        }

        try {
            const { data } = await register(user)

            dispatch(setAuth({ isAuth: true, user: data.user }))
            notify("Signup successful!", 'success')

            setTimeout(() => {
                navigate('/')
            }, 1500)

        } catch (error) {
            console.log(error);
            notify(error.response.data.message, 'error')
        }

    }

    return (
        <div className='container mx-auto py-4 sm:py-10 px-4 relative pb-20 flex sm:flex-row flex-col'>
            <ToastContainer />
            <div className="sm:min-h-screen sm:h-full w-full sm:w-96">
                <img
                    className='w-40 sm:w-96 sm:mx-0 mx-auto block'
                    src="/images/signup.png"
                    alt="signup" />
            </div>
            <div className='flex-1 pt-4 sm:pt-10'>
                <h1 className='font-bold text-xl text-center'>Welcome to <span className="text-red-800">Course Mania</span></h1>
                <p className='text-gray-500 text-center'>Create an account to get your course</p>

                <form action="#" className='w-max block mx-auto mt-10 px-4'>
                    <label className='font-bold inline-block mt-4 text-sm text-red-800' htmlFor="name">Name <span className='text-red-500'>*</span></label>
                    <input
                        value={user.name}
                        name='name'
                        onChange={setDetails}
                        className='outline-none py-2 w-72 sm:w-96 border-2 border-solid border-yellow-500 block'
                        type="text" />

                    <label className='font-bold inline-block mt-8 text-sm text-red-800' htmlFor="email">Email <span className='text-red-500'>*</span></label>
                    <input
                        value={user.email}
                        name='email'
                        onChange={setDetails}
                        className='outline-none py-2 w-72 sm:w-96 border-2 border-solid border-yellow-500 block'
                        type="email" />
                    <label className='font-bold inline-block mt-8 text-sm text-red-800' htmlFor="pwd">Password <span className='text-red-500'>*</span></label>
                    <input
                        value={user.password}
                        name='password'
                        onChange={setDetails}
                        className='outline-none py-2 w-72 sm:w-96 border-2 border-solid border-yellow-500 block'
                        type="password" />

                    <button
                        onClick={handleRegistration}
                        type="submit"
                        className='w-64 h-12 block mx-auto bg-red-800 text-white mt-6'>Register</button>
                </form>

                <span className='block mx-auto w-max mt-6'>Already have an account? <NavLink className={'font-bold'} to={'/login'}>Login</NavLink></span>

                <footer className="absolute py-4 bg-yellow-100 text-center bottom-0 left-0 w-full">
                    Couse Mania&copy; || All rights reserved
                </footer>
            </div>

        </div>
    )
}

export default Register