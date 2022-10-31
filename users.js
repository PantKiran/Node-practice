// const express = require('express')
const users = express()
const cors = require('cors')
const bodyParser = require('body-parser')



users.listen(5000,()=>{
  console.log("server is running at port 5000")
})