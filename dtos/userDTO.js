module.exports = class UserDTO {

    constructor({ _id, name, email, enrolledCourses, watchedVideos }) {

        this._id = _id;
        this.name = name;
        this.email = email,
        this.enrolledCourses = enrolledCourses;
        this.watchedVideos = watchedVideos
    }

}