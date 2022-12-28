const { connect, connection } = require('mongoose')
const { CLOUD_DB_URL } = require('../env')

module.exports = function connectDb() {

    try {
        connect(CLOUD_DB_URL, {
            useUnifiedTopology: true
        })
        connection.on('open', () => console.log('connected to db...'))
        
    } catch (error) {
        console.log(error);
    }
    
}