
const courseController = require('../controllers/courses')
const authController = require('../controllers/auth')
const enrollmentController = require('../controllers/enrollment')
const streamingController = require('../controllers/streaming')

const router = require('express').Router()

const authenticate = require('../middleware/authenticate')

//for loading videos and instructor model (don't touch)
require('../models/instructor')
require('../models/video')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/refresh', authController.refreshAccessToken)
router.post('/logout', authController.logout)
router.get('/profile', authenticate, authController.profile)

router.get('/courses', courseController.getAllCourses)
router.get('/courses/:_id', courseController.getCourse)

router.post('/enroll', authenticate, enrollmentController.enrollUser)

router.get('/video/:_id', authenticate, streamingController.streamVideo)

module.exports = router