import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginUser } from '../api'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'

const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [user, setUser] = useState({ email: '', password: '' })

    const notify = (text, type) => toast(text, { type, theme: 'light', autoClose: 1400 })

    async function handleRegistration(e) {
        e.preventDefault()

        if (!user.email || !user.password) {
            return notify('Please fill all the fields!', 'error')
        }

        try {
            const { data } = await loginUser(user)

            dispatch(setAuth({ isAuth: true, user: data.user }))
            notify("Login successful!", 'success')

            setTimeout(() => {
                navigate('/')
            }, 1500)

        } catch (error) {
            console.log(error);
            notify(error.response.data.message, 'error')
        }
    }

    return (
        <div className='container mx-auto pt-4 sm:pt-10 relative pb-20 flex flex-col sm:flex-row sm:px-0 px-4'>
            <ToastContainer />

            <div className="sm:min-h-screen sm:h-full sm:w-96 block flex sm:mx-0 mx-auto items-center">
                <img
                    className='w-40 sm:w-96'
                    src="/images/login.png"
                    alt="login" />
            </div>

            <div className='pt-10 flex-1 sm:w-max w-full'>
                <h1 className='font-bold text-xl text-center'>Welcome Back to <span className="text-red-800">Course Mania</span>!</h1>
                <p className='text-gray-500 text-center'>Login to your account</p>

                <form action="#" className='w-max block mx-auto sm:mt-10 mt-4'>

                    <label className='font-bold inline-block mt-8 text-sm text-red-800' htmlFor="email">Email <span className='text-red-500'>*</span></label>
                    <input
                        value={user.email}
                        name="email"
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        className='outline-none py-2 w-80 sm:w-96 border-2 border-solid border-yellow-500 block'
                        type="email" />
                    <label className='font-bold inline-block mt-8 text-sm text-red-800' htmlFor="pwd">Password <span className='text-red-500'>*</span></label>
                    <input
                        value={user.password}
                        name="password"
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        className='outline-none  py-2 w-80 sm:w-96 border-2 border-solid border-yellow-500 block'
                        type="password" />

                    <button
                        onClick={handleRegistration}
                        type="submit"
                        className='w-64 h-12 block mx-auto bg-red-800 text-white mt-6'>Login</button>
                </form>

                <span className='block mx-auto w-max mt-6'>Don't have an account? <NavLink className={'font-bold'} to={'/register'}>Signup</NavLink></span>
                <span className='block mx-auto w-max mt-6'><NavLink className={'font-bold'} to={'/'}>Forgot Password?</NavLink></span>

                <footer className="absolute py-4 bg-yellow-100 text-center bottom-0 left-0 w-full">
                    Couse Mania&copy; || All rights reserved
                </footer>

            </div>
        </div>
    )
}

export default Login