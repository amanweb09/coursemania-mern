require('dotenv').config()
const { PORT, REACT_APP_URL, COOKIE_SECRET } = require('./env')

const express = require('express')
const app = express()
const port = PORT || 3100

const cors = require('cors')
app.use(cors({
    origin: [REACT_APP_URL, 'http://192.168.1.33:3000'],
    credentials: true
}))

require('./db/connection')()

const cookies = require('cookie-parser')
const path = require('path')
app.use(cookies(COOKIE_SECRET))
app.use(express.json())
app.use('/api', require('./router'))

const STATIC_PATH = path.resolve(__dirname, './client/build')
const INDEX_PATH = path.resolve(__dirname, './client/build', 'index.html')
app.use(express.static(STATIC_PATH))

app.get('*', (req, res) => {
    return res
    .status(200)
    .sendFile(INDEX_PATH)
})


app.listen(port, () => {
    console.log('listening on port', port);
})