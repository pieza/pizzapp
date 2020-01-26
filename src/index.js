const dotenv = require('dotenv')
dotenv.config()

// db connection
require('./database')

// server
const app = require('./server')

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server listening on port ${app.get('port')}`);
})