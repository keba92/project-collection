const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const collections = require('./config/collectionSchema');
const items = require('./config/itemSchema')

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (process.env.NODE_ENV === 'production'|| process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get('*', function(req, res){
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  };

http.listen(PORT, () => {
    console.log('listening on *:3001');
  });

mongoose
    .connect(
        'mongodb+srv://admin:admin@cluster0.ucss3.mongodb.net/project?retryWrites=true&w=majority',
        { useUnifiedTopology: true, useNewUrlParser: true },
    )
    .then(() => console.log('MongoDb connected'))
    .catch((e) => console.log(e))

app.post('/addCollection', (req,res) =>{
    const { id, collect } = req.body;
    collections.create({
        id: id,
        collections: collect,
    })
    .catch((err)=> console.log(err))
})

app.post('/addItem', (req,res) =>{
    const { id, collect, name, description, teg,url } = req.body;
    items.create({
        id: id,
        collections: collect,
        name: name,
        description: description,
        teg: teg,
        url: url
    })
    .catch((err)=> console.log(err))
})

app.post('/getItems', (req,res) =>{
    const { id } = req.body;
    if (id == 'all') {
        items.find()
        .then((data) => res.send(data))
        .catch((err)=> console.log(err))
    } else {
        items.find({ id: id })
        .then((data) => res.send(data))
        .catch((err)=> console.log(err))
    }
})
app.post('/getItemInfo', (req,res) => {
    const { _id } = req.body;
    items.find({
        _id: _id
    })
    .then((data) =>{
        return res.send(data);
    })
    .catch((err) => console.log(err))
})

app.get('/getCollection', (req,res) => {
    collections.find()
    .then((data) =>{
        return res.send(data);
    })
    .catch((err) => console.log(err))
})
