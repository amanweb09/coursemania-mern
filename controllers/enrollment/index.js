const UserDTO = require("../../dtos/userDTO");
const authService = require("../../services/auth-service")

class EnrollmentController {

    async enrollUser(req, res) {
        const { courseId } = req.body

        if (!courseId) {
            return res.status(422).json({ message: "all fields are required" })
        }

        let user;
        try {
            const findUser = await authService.find({ _id: req.user._id })

            if (!findUser.length) {
                return res.status(404).json({ message: "user not found" })
            }

            user = findUser[0];

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }

        const findCourse = user.enrolledCourses.find((crs) => { return crs.course._id == courseId })
        
        if(findCourse) {
            return res.status(400).json({ message: "You have already enrolled for this course" })
        }


        const courseModel = { course: courseId, enrolledOn: Date.now() }
        user.enrolledCourses.unshift(courseModel)

        try {
            const saveUser = await user.save()
            return res.status(200).json({ user: new UserDTO(saveUser) })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

}

module.exports = new EnrollmentController()