const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: false
    },
    enrolledCourses: [
        {
            course: {
                type: Schema.Types.ObjectId,
                ref: 'courses',
                unqiue: false
            },
            enrolledOn: {
                type: Number
            },
            currentModule: {
                type: Number,
                default: 1
            }
        }
    ],
    watchedVideos: [
        {
            type: String
        }
    ]
})

module.exports = new model('users', userSchema, 'users')