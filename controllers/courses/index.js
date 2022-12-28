const courseService = require("../../services/course-service")

class CourseController {

    async getAllCourses(req, res) {

        try {
            const courses = await courseService.find()
            return res.status(200).json({ courses })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getCourse(req, res) {
        const { _id } = req.params

        try {
            const course = await courseService.find({ _id })

            if (course.length) {
                return res.status(200).json({ course: course[0] })
            }

            return res.status(404).json({ message: 'No such course exists' })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

}

module.exports = new CourseController()