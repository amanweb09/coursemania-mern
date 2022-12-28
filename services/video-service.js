const Videos = require('../models/video')

class VideoService {

  async find(filter) {
    return await Videos.find(filter)
  }

}

module.exports = new VideoService()