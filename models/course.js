const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'instructors',
        unique: false
    },
    details: {
        type: [String],
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    modules: {
        type: [
            {
                title: {
                    type: String,
                    reuired: true
                },
                content: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'videos',
                        unique: false
                    }
                ]
            }
        ]
    }
}, { timestamps: true })

module.exports = model('courses', courseSchema, 'courses')