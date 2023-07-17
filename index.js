const http = require('http');
const app = require("./src/server")
require('dotenv').config()

const server = http.createServer(app)
const port = process.env.PORT || 8080
server.listen(port, () => console.log("Listening port on " + port))