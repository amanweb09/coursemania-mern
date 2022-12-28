const Course = require('./../models/course')

class CourseSerivice {

    async find(filter) {
        return await Course
            .find(filter)
            .populate('instructor')
            .populate('modules.content')
            .exec()
    }

}

module.exports = new CourseSerivice()