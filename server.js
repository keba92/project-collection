const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
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



io.on("connection", function(socket) {
    socket.on('addItem', async (data)=>{
        const { idUser, idCollect, dataItem, poleItem } = data;
        await items.create({
            idUser: idUser,
            idCollect: idCollect,
            dataItem: dataItem,
            poleItem: poleItem
        })
        .catch((err)=> console.log(err))

        await items.find({ idCollect: idCollect })
            .then((data) => socket.emit('getDataItems', data))
            .catch((err)=> console.log(err))
    })

    socket.on('getItems', (data) => {
        const { idCollect } = data;
        if (idCollect == 'all') {
            items.find()
            .then((data) => socket.emit('getDataItems', data))
            .catch((err)=> console.log(err))
        } else {
            items.find({ idCollect: idCollect })
            .then((data) => socket.emit('getDataItems', data))
            .catch((err)=> console.log(err))
        }
    })

    socket.on('getCollectionInfo', (data) => {
        const { _id } = data;
        collections.find({
            _id: _id
        })
        .then((data) =>{
            return socket.emit('getCollectionDataInfo', data);
        })
        .catch((err) => console.log(err))
    })

    socket.on('getCollection', (data) => {
        const { id } = data;
        collections.find({
            id: id
        })
        .then((data) =>{
            return socket.emit('getDataCollect', data);
        })
        .catch((err) => console.log(err))
    })

    socket.on('addCollection', async (data) =>{
        const { id, name, description, teg, url, poleItem } = data;
        await collections.create({
            id: id,
            name: name,
            description: description,
            teg: teg,
            url: url,
            poleItem: poleItem
        })
        .catch((err)=> console.log(err))
        await collections.find({
            id: id
        })
        .then((data) =>{
            return socket.emit('getDataCollect', data);
        })
        .catch((err) => console.log(err))
    })

    socket.on('getItemInfo', (data) => {
        const { _id } = data;
        items.find({
            _id: _id
        })
        .then((data) =>{
            return socket.emit('getItemDataInfo', data);
        })
        .catch((err) => console.log(err))
    })

    socket.on('deleteItem', (data) => {
        const { _id } = data;
        items.deleteOne({
            _id: _id
        })
        .catch((err) => console.log(err))
    })

    socket.on('editItem', (data) =>{
        const { _id, dataItem } = data;
        items.updateOne(
        {
            _id: _id
        },
        {
            $set: {dataItem: dataItem}
        },
        (err, result) => {
            if(err) console.log(err);
        }
        )
    })
})