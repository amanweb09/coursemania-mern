const { Schema, model } = require('mongoose')

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = model('videos', videoSchema, 'videos')