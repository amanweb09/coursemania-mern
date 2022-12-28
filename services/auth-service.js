const Users = require('./../models/user')

class AuthService {

    async find(filter) {
        return await Users
            .find(filter)
            .populate('enrolledCourses.course')
            // .populate('enrolledCourses.course.modules.content')
            .exec()
    }

    async create(user) {
        return await Users.create(user)
    }

}

module.exports = new AuthService()