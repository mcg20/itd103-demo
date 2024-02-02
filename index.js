const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./User');
const app = express();
const port = 3000;

app.use(express.json());
const mongoURI = 'mongodb://localhost:27017/itd103db';

// Connect to MongoDB

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, 
  socketTimeoutMS: 45000   
}).then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  UserModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))
});

app.get('/get/:id', (req,res) => {
  const id = req.params.id
  UserModel.findById({_id: id })
  .then(post => res.json(post))
  .catch(err => console.log(err))
})

app.post('/create', (req,res) => {
 UserModel.create(req.body)
 .then(user => res.json(user))
 .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  }, { new: true }) // Add { new: true } to return the updated document
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.delete('/deleteuser/:id', (req, res) =>{
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id })
  .then(response => res.json(response))
  .catch(err => res.json(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
