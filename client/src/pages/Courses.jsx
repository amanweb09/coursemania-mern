import React, { useEffect, useState } from 'react'
import MainCourseCard from '../components/courses/MainCourseCard'
import Filter from '../components/courses/Filter'
import { getAllCourses } from '../api'
import Loading from '../components/shared/Loading'

const Courses = () => {

    const [courses, setCourses] = useState(null)

    useEffect(() => {

        async function fetchCourses() {
            try {
                const { data } = await getAllCourses()
                setCourses(data.courses)
            } catch (error) {
                console.log(error);
            }
        }

        fetchCourses()

    }, [])

    if (!courses) {
        return <Loading />
    }

    return (
        <div className='container mx-auto py-6 bg-neutral-50 px-4'>

            <Filter
                setCourses={setCourses}
                courses={courses} />

            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-10 overflow-hidden px-2'>
                {
                    courses.map((course) => {
                        return <MainCourseCard
                            price={course.price}
                            rating={course.rating}
                            image={course.image}
                            title={course.title}
                            desc={course.desc}
                            _id={course._id}
                            key={course._id} />
                    })
                }
            </div>
        </div>
    )
}

export default Courses