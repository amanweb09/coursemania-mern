import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { enrollUser, getCourseById } from '../api'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../store/authSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../components/shared/Loading'

const Payment = () => {

    const { _id } = useParams()

    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [course, setCourse] = useState(null)

    const notify = (text, type) => toast(text, { type, theme: 'light', autoClose: 1500 })

    useEffect(() => {

        async function fetchCourseById() {
            try {
                const { data } = await getCourseById(_id)
                setCourse(data.course)

            } catch (error) {
                console.log(error);
                alert(error.response.data.message)
            }
        }

        fetchCourseById()

    }, [])

    async function handlePayment() {
        // request on server
        try {
            notify('Enrollment in process', 'warning')
            const { data } = await enrollUser({
                courseId: _id
            })

            dispatch(setAuth({ isAuth: true, user: data.user }))

            notify('Woohoo..Enrolled Sucessfully!', 'success')
            setTimeout(() => {
                navigate('/my-library')
            }, 1600)

        } catch (error) {
            
            console.log(error);
            const er = error.response.data.message || "Something went wrong!"
            notify(er, 'error')
        }
    }

    if (!course) { return <Loading />}

    return (
        <div className='container mx-auto bg-neutral-50 pt-10 pb-20 sm:px-0 px-4'>
            <ToastContainer />
            <div className="p-6 bg-white block mx-auto shadow-md w-full sm:w-1/2">
                <h1 className='font-bold text-lg text-red-800'>Billing Details</h1>

                <div className='mt-6'>
                    <span className='font-semibold'>Course Name: </span>
                    <span>{course.title} </span>
                </div>

                <div className='mt-2'>
                    <span className='font-semibold'>Price to be paid: </span>
                    <span>&#8377;{course.price} </span>
                </div>

                <div className='mt-2'>
                    <span className='font-semibold'>Billing date: </span>
                    <span>{moment().format('DD MMMM YYYY')}</span>
                </div>

                <div className='mt-2'>
                    <span className='font-semibold'>Customer name: </span>
                    <span className='capitalize'>{user?.name} </span>
                </div>

                <button
                    onClick={handlePayment}
                    className='w-full sm:w-80 h-12 text-white bg-red-800 flex-center font-bold mx-auto block mt-16 hover:bg-red-900'>
                    <LockClosedIcon className='text-white w-4 mr-2 h-4' />
                    Pay Now
                </button>
            </div>
        </div>
    )
}

export default Payment