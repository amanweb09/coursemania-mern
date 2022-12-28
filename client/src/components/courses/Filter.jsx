import React from 'react'

const Filter = ({ setCourses, courses }) => {

    const __courses = courses

    function handleCategoryChange(e) {

        setCourses(__courses)

        if (e.target.value) {
            const filteredCourse = courses.filter((course) => { return course.category === e.target.value })
            return setCourses(filteredCourse)
        }

        return setCourses(__courses)
    }

    function handleRatingChange(e) {

        setCourses(__courses)

        if (e.target.value) {
            const filteredCourse = courses.filter((course) => { return course.rating >= e.target.value })
            return setCourses(filteredCourse)
        }

        return setCourses(__courses)
    }

    function handleSearch(e) {

        setCourses(__courses)

        const query = e.target.value;

        if (e.target.value) {

            let filteredCourses = []
            courses.forEach((c) => {
                const title = c.title
                if(title.includes(query)) {
                    filteredCourses.push(c)
                }
            })
            console.log(courses);
            return setCourses(filteredCourses)
        }
        else {
            return setCourses(__courses)
        }
    }

    return (
        <div className="w-full p-4 bg-white flex sm:flex-row flex-col items-center justify-between my-4">
            <div className='flex px-2 sm:mb-0 mb-2'>
                <select
                    onChange={handleCategoryChange}
                    className='px-4 py-2 bg-white rounded-full border border-gray-200'
                    name="category"
                    id="">
                    <option value="">Filter By Category</option>
                    <option value="tech">Technology</option>
                    <option value="business">Business</option>
                    <option value="exams">Competitive Exams</option>
                </select>

                <select
                    onChange={handleRatingChange}
                    className='px-4 py-2 bg-white rounded-full border border-gray-200 ml-2 sm:ml-6'
                    name="rating"
                    id="">
                    <option value="">Rating</option>
                    <option value={5}>5</option>
                    <option value={4}>4 and more</option>
                    <option value={3}>3 and more</option>
                    <option value={2}>2 and more</option>
                </select>
            </div>

            <div className="bg-neutral-100 w-80 px-4 py-2 rounded-full mr-4">
                <input
                onChange={handleSearch}
                    placeholder='Search a course'
                    className='bg-transparent'
                    type="text" />
            </div>
        </div>
    )
}

export default Filter