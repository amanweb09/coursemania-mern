const videoService = require("../../services/video-service");
const authService = require("../../services/auth-service");
const path = require('path')
const fs = require('fs')

class StreamingController {

    async streamVideo(req, res) {

        const range = req.headers.range;

        if (!range) {
            return res.status(400).json({ message: "Range header is needed..." })
        }

        let video;
        try {
            const findVideo = await videoService.find({ _id: req.params._id })

            if (!findVideo.length) {
                return res.status(400).json({ message: "Video not found..." })
            }

            video = findVideo[0];

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }


        let size;
        const fp = path.join(__dirname, `../../static/videos/${video.url}`)

        try {

            const stats = await fs
                .promises
                .stat(fp)

            size = stats.size;

        } catch (error) {
            console.log(error);
        }

        const CHUNK_SIZE = 10 ** 6  //1mb
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + CHUNK_SIZE, size - 1)
        const contentLength = end - start + 1

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }

        // let user;
        // try {
        //     const findUser = await authService.find({ _id: req.user._id })
        //     user = findUser[0]

        // } catch (error) {
        //     console.log(error);
        //     return res.status(500).json({ message: 'Internal server error' })
        // }

        // user.watchedVideos.push(req.params._id)
        // try {
        //     await user.save()
        // } catch (error) {
        //     return res.status(500).json({ message: 'Internal server error' })
        // }

        res.writeHead(206, headers)
        const videoStream = fs.createReadStream(fp, { start, end })
        videoStream.pipe(res)
    }

}

module.exports = new StreamingController()