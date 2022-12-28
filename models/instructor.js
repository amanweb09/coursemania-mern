const { Schema, model } = require('mongoose')

const instructorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    contactDetails: {
        phone: {
            type: String
        },
        email: {
            type: String
        }
    }
})

module.exports = model('instructors', instructorSchema, 'instructors')