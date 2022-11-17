const  mongoose  = require('mongoose')
const express = require('express')
const bodyParser = require("body-parser")
const routes = require('./routes/api')
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT || 3001
const app = express()
app.use(cors())
/////////socket.io
const http= require("http")
const {Server}= require('socket.io')

const server= http.createServer(app)
const io =new Server(server, {
  cors:{
      origin:["http://localhost:3000","http://localhost:3002"],
      methods:["GET","POST"]
  },
})

io.on("connection",(socket)=>{
  console.log("user connected :"+socket.id);

  socket.on("join_room",(data)=>{
      socket.join(data)
  })
  socket.on("send_msg",(data)=>{
      socket.to(data.room).emit("recive_msg",data)
  })
})

///////////end
mongoose.Promise = global.Promise
mongoose.connect( process.env.DB, {useNewUrlParser: true})
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log(err))

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use('/api', routes)


server.listen( port, () => {
    console.log(`server listening on ${port} `);
})

module.exports = app;