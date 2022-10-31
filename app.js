
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors())
app.use(bodyParser.json())

// connecting database to backend
const uri = 'mongodb://localhost:27017/winnerdb'
const connect=async()=>{
  try{
      mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log("connected to mongodb");
  }catch(error){
      console.error(error);
  }
}
connect()

// user sechema 
const UserSchema = new mongoose.Schema({
  name: {type:String, required:true},
  isWinner:{type:Boolean, required:true}
},{
  collection:'users'

})

// user model
const Users = mongoose.model('UserModel', UserSchema)

// making server that run at port 3000
app.listen(3005, () => {
  console.log(`Example app listening on port 3005`)
})

app.post('/register',async(req,res)=>{
  // Users.create(req.body)
  console.log(req.body)
  Users.create(req.body)
})

app.get('/users', async(req,res)=>{
  const users = await Users.find({})
  res.json({
    users:users
  })
})

app.delete('/users/:id', async(req,res)=>{
  let data = await Users.findOneAndDelete({_id:req.params.id})
  if(data){
    res.json({
      message: 'deleted'
    })
  }
  
})

// put method
app.put('/users', async(req,res)=>{
  const filter = {name:req.body.name};
  const update = {isWinner: true};
  let data = await Users.findOneAndUpdate(filter,update);
  if(data){
    res.json({
      message: 'updated'
    })
  }
})
 
