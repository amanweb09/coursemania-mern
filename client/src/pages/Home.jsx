import { BookOpenIcon } from '@heroicons/react/24/outline'
import React from 'react'
import MainCourseCard from '../components/courses/MainCourseCard'
import { courses } from '../constants/courses'
import { NavLink, useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate()

    return (
        <div className='container mx-auto'>

            <section className='flex sm:flex-row px-4 sm:px-0 flex-col'>
                <div className='w-full sm:w-1/2 mt-12 sm:mt-20'>
                    <h1 className='text-3xl sm:text-6xl font-extrabold'>
                        Search and find your best <span className="text-red-800">Courses</span>...
                    </h1>
                    <p className='text-xs sm:text-sm text-gray-600 mt-2'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem dignissimos non sint facilis iure necessitatibus debitis? Voluptatibus cumque nam, eaque fugiat dicta cupiditate ducimus vero impedit quis ab, totam iste voluptates dignissimos natus dolor accusantium placeat! Illo, cumque quisquam. Amet, accusamus totam quis quod facere hic doloremque id illo nesciunt.
                    </p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="w-full sm:w-64 block h-12 bg-red-800 text-white mt-6">
                        Enroll Now
                    </button>
                </div>

                <div className=''>
                    <img
                        className='sm:w-72 w-full sm:ml-8 mt-8'
                        src="https://media.sciencephoto.com/f0/28/51/63/f0285163-800px-wm.jpg"
                        alt="" />
                </div>
            </section>

            <section className='bg-yellow-100 overflow-hidden w-full flex flex-col py-10 sm:px-0 px-4 mt-6'>
                <h1 className='font-bold mt-6 text-xl sm:text-3xl text-center'>Collaborated with 50+ <br /> Leading Companies and Universities</h1>
                <p className="text-gray-600 px-4 sm:text-base text-sm sm:px-10 w-full sm:w-3/4 mt-4 text-center block mx-auto">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis consequuntur optio iste sunt commodi dolorem dolorum! Consectetur ullam itaque commodi mollitia expedita quo, laboriosam saepe cupiditate impedit optio nesciunt consequuntur explicabo repellendus soluta adipisci doloremque esse? Architecto voluptates modi provident, saepe distinctio voluptatibus placeat ducimus perferendis minus odio, corporis omnis!
                </p>

                <div className="mt-12 flex-center">
                    <img src="/images/google.png" className='w-16 sm:w-48' alt="google" />
                    <img src="/images/amazon.png" className='w-16 sm:w-48' alt="amazon" />
                    <img src="/images/microsoft.png" className='w-24 sm:w-64' alt="microsoft" />
                    <img src="/images/adobe.png" className='w-16 sm:w-48' alt="adobe" />
                </div>
            </section>

            <section className='px-2'>
                <h1 className="text-center my-10 font-extrabold text-3xl">Our Best Courses</h1>

                <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-10'>
                    {
                        courses.map((course) => {
                            return <MainCourseCard
                                price={course.price}
                                rating={course.rating}
                                image={course.image}
                                title={course.title}
                                desc={course.desc}
                                _id={course._id}
                                key={course._id}
                                btnText="View Courses"
                                navigateTo="/courses" />
                        })
                    }

                </div>

            </section>

            <section className='mt-10'>
                <h1 className='text-xl sm:text-4xl font-extrabold text-center mt-20'>Join <span className="text-red-800">3000+ students</span> community <br /> and achieve your dream!</h1>
                <img
                    className='w-96 mt-6 block mx-auto'
                    src="/images/certificate.png"
                    alt="illus" />
            </section>

            <footer className="bg-yellow-100 w-full h-64 p-4 sm:p-12 flex sm:flex-row flex-col sm:items-center justify-between">
                <div>
                    <div className="flex items-center">
                        <BookOpenIcon className='text-red-800 h-8 w-8 sm:h-12 sm:w-12 mr-2' />
                        <span className='font-extrabold text-lg sm:text-xl'>Course <span className="text-red-800">Mania</span></span>
                    </div>

                    <div className='text-red-800 sm:mt-0 mt-4'>
                        <h1 className="font-bold block text-red-800">Contact Us</h1>
                        <span className='italic block'>+91-981256958</span>
                        <span className='italic'>help@coursemania.com</span>
                    </div>
                </div>

                <div className='text-red-800 flex sm:flex-col flex-row'>
                    <NavLink className={'text-sm sm:mx-0 mx-2 sm:text-lg font-bold'}>FAQs</NavLink>
                    <NavLink className={'text-sm sm:mx-0 mx-2 sm:text-lg font-bold block'}>About</NavLink>
                    <NavLink className={'text-sm sm:mx-0 mx-2 sm:text-lg font-bold'}>Command Center</NavLink>
                </div>
            </footer>

        </div>
    )
}

export default Home