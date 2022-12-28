import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/React-Toastify.css'

const Toast = ({ text, type }) => {

    const notify = () => toast(text, { type, theme: 'light', autoClose: 5000 })

    return (
        <ToastContainer />
    )
}

export default Toast