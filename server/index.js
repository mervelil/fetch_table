const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Required for serving static files
const app = express();

// Middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/est', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the user schema and model
const userSchema = new mongoose.Schema({
  total_bill: Number,
  tip: Number,
  sex: String,
  smoker: Boolean,
  day: String,
  time: String,
  size: Number
});
const userModel = mongoose.model("users", userSchema);

// Serve the Vue.js frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Define root route (for API)
app.get("/getUsers", (req, res) => {
  userModel.find({})
    .then(users => res.json(users))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error retrieving users');
    });
});

// Delete user by ID
app.delete('/deleteUser/:id', (req, res) => {
  userModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error deleting user');
    });
});
app.put('/updateUser/:id', (req, res) => {
  userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error updating user');
    });
});

// Serve index.html from the Vue.js build (for all non-API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'component', 'UserTable.vue'));
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
// const express=require('express')
// const mongoose=require('mongoose')
// const app=express()
// const cors = require('cors');
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/est', { useNewUrlParser: true, useUnifiedTopology: true })
// const userSchema=new mongoose.Schema({
//     total_bill:Number,
//     tip:Number,
//     sex:String,
//     smoker:Boolean,
//     day:String,
//     time:String,
//     size:Number
 
// })
// const userModel=mongoose.model("users",userSchema)
// // Define root route
// app.get("/", (req, res) => {
//     res.send("Welcome to the API");
// });
// app.get("/getUsers",(req,res)=>{
//     userModel.find({}).then(function(users){
//             res.json(users)
//         }).catch(function (error) {
//                 console.log(error)
//             })

//         })

// // Delete user by ID
// app.delete('/deleteUser/:id', (req, res) => {
//     userModel.findByIdAndDelete(req.params.id)
//       .then(() => res.json({ message: 'User deleted successfully' }))
//       .catch(error => {
//         console.error(error);
//         res.status(500).send('Error deleting user');
//       });
//   });
  

// app.listen(3001,()=>{
//     console.log('Server is running on port 3001')
// })
