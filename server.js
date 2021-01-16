const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const path = require('path');
const cors = require('cors');
const expressStatusMonitor = require('express-status-monitor');
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
      },
      reconnect: true,
      transports: ['websocket', 'polling', 'flashsocket']
});
const axios = require("axios").default;
const PORT = process.env.PORT || 3001;

const collections = require('./config/collectionSchema');
const items = require('./config/itemSchema');
const likes = require('./config/likeSchema');
const comments = require('./config/commentSchema');
const users = require('./config/usersSchema');

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.use(expressStatusMonitor({
  websocket: io,
  port: app.get('port')
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

mongoose.set('useCreateIndex', true);

const clients = {};

io.on("connection", function(socket) {
    clients[socket.id] = true;
    socket.on('addItem', async (data)=>{
        const { idUser, idCollect, tag, dataItem, poleItem } = data;
        await items.create({
            idUser: idUser,
            idCollect: idCollect,
            tag: tag,
            dataItem: dataItem,
            poleItem: poleItem
        })
        .catch((err)=> console.log(err))

        await items.find({ idCollect: idCollect })
            .then((data) => {
                socket.emit('getDataItems', data);
            })
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
            socket.emit('getCollectionDataInfo', data);
        })
        .catch((err) => console.log(err))
    })

    socket.on('getCollection', (data) => {
        const { id } = data;
        if(id == 'all'){
            collections.find()
            .then((data) =>{
                socket.emit('getDataCollect', data);
            })
            .catch((err) => console.log(err))
        } else {
            collections.find({
                id: id
            })
            .then((data) =>{
                socket.emit('getDataCollect', data);
            })
            .catch((err) => console.log(err))
        }
    })

    socket.on('addCollection', async (data) =>{
        const { id, name, description, tema, url, poleItem } = data;
        await collections.create({
            id: id,
            name: name,
            description: description,
            tema: tema,
            url: url,
            poleItem: poleItem
        })
        .catch((err)=> console.log(err))
        await collections.find({
            id: id
        })
        .then((data) =>{
            socket.emit('getDataCollect', data);
        })
        .catch((err) => console.log(err))
    })

    socket.on('getItemInfo', (data) => {
        const { _id } = data;
        items.find({
            _id: _id
        })
        .then((data) =>{
            socket.emit('getItemDataInfo', data);
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

    socket.on('addLikeItem', (data) => {
        const { idItem, countLike, idUsers } = data;
        likes.create({
            idItem: idItem,
            countLike: countLike,
            idUsers: idUsers
        }).then((data)=>socket.broadcast.emit('getLikeInfo', data))
        .catch((err)=> console.log(err))
    })

    socket.on('getLike', (data) => {
        const { idItem } = data;
        likes.find({
            idItem: idItem
        })
        .then( async (data)=>{
            if(data.length == 0){
                await likes.create({
                    idItem: idItem
                })
                .catch((err)=> console.log(err))
                await likes.find({
                    idItem: idItem
                })
                .then((data) => {
                    socket.emit('getLikeInfo', data)
                })
                .catch((err)=> console.log(err))
            } else {
                socket.emit('getLikeInfo', data);
            }
        })
        .catch((err)=> console.log(err))
    })

    socket.on('updateLike', (data) => {
        const { idItem, countLike, idUsers } = data;
        likes.updateOne(
            {
                idItem: idItem
            },
            {
                $set: {
                    countLike: countLike,
                    idUsers: idUsers
                }
            },
            (err, result) => {
                if(err) console.log(err);
            }
        )
    })

    socket.on('getComment', (data) => {
        const { idItem } = data;
        comments.find({
            idItem: idItem
        })
        .then( async (data)=>{
            if(data.length == 0){
                await comments.create({
                    idItem: idItem
                })
                .catch((err)=> console.log(err))
                await comments.find({
                    idItem: idItem
                })
                .then((data) =>{ 
                    socket.emit('getCommentData', data)
                })
                .catch((err)=> console.log(err))
            } else {
                socket.emit('getCommentData', data)
                socket.broadcast.emit('getCommentData', data);
            }
        })
        .catch((err)=> console.log(err))
    })

    socket.on('updateComment', (data) => {
        const { idItem, arrComment } = data;
        comments.updateOne(
            {
                idItem: idItem
            },
            {
                $set: {
                    arrComment: arrComment
                }
            },
            (err, result) => {
                if(err) console.log(err);
                socket.on('getComment', (data) => {
                    const { idItem } = data;
                    comments.find({
                        idItem: idItem
                    })
                    .then( (data)=>{
                        socket.emit('getCommentData', data);
                        socket.broadcast.emit('getCommentData', data);
                    })
                    .catch((err)=> console.log(err))
                })
            }
        )
    })

    socket.on('makeAdmin', (data) => {
        const { message, adminList } = data;
        const options = {
            method: 'POST',
            url: 'https://dev-lma8p4gy.eu.auth0.com/api/v2/roles/rol_T31Z6EKjiFLeoH0T/users',
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer '+ message,
              'cache-control': 'no-cache'
            },
            data: {
                users: adminList
            },
            scope: "update:roles",
          };
        
        axios.request(options).then(function (response) {
          }).catch(function (error) {
            console.error(error);
          });
    })

    socket.on('deleteUser', (data) => {
        const { message, idUser } = data;
        const options = {
            method: 'DELETE',
            url: `https://dev-lma8p4gy.eu.auth0.com/api/v2/users/${idUser}`,
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer '+ message,
              'cache-control': 'no-cache'
            },
            scope: "delete:users",
          };
        
        axios.request(options).then(function (response) {
          }).catch(function (error) {
            console.error(error);
          });
    })

    socket.on('blockUser', (data) => {
        const { message, idUser, block } = data;
        const options = {
            method: 'PATCH',
            url: `https://dev-lma8p4gy.eu.auth0.com/api/v2/users/${idUser}`,
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer '+ message,
              'cache-control': 'no-cache'
            },
            data: {
                blocked: block
            },
            scope: "update:users",
          };
        
        axios.request(options).then(function (response) {
          }).catch(function (error) {
            console.error(error);
          });
    })

    socket.on('deleteCollection', (data) => {
        const { _id } = data;
        collections.deleteOne({
            _id: _id
        })
        .catch((err) => console.log(err))
        items.deleteOne({
            idCollect: _id
        })
        .catch((err) => console.log(err))
    })

    socket.on('getCollectionInfo', (data) => {
        const { _id } = data;
        collections.find({
            _id: _id
        })
        .then((data) =>{
            socket.emit('getCollectionDataInfo', data);
        })
        .catch((err) => console.log(err))
    })

    socket.on('editCollection', (data) =>{
        const { _id, name, description, tema, url, poleItem } = data;
        collections.updateOne(
        {
            _id: _id
        },
        {
            $set: {
                name: name,
                description: description,
                tema: tema,
                url: url,
                poleItem: poleItem
            }
        },
        (err, result) => {
            if(err) console.log(err);
        }
        )
    })

    socket.on('searchFT', (data) => {
        const { word } = data;
        items.find({
            $text: {$search: word}
        })
        .then(res => socket.emit('dataItem', res))
        .catch(e=> console.log(e))

        comments.find({
            $text: {$search: word}
        })
        .then(res => socket.emit('dataComment', res))
        .catch(e=> console.log(e))
    })

    socket.on('userData', (data) => {
        const { id, theme, lang } = data;
        users.find({
            id: id
        })
        .then( (data)=>{
            if(data.length == 0){
                users.create({
                    id: id,
                    theme: theme,
                    lang: lang
                })
                .catch((err)=> console.log(err))
            } else {
                users.updateOne(
                    {
                        id: id
                    },
                    {
                        $set: {
                            theme: theme,
                            lang: lang
                        }
                    },
                    (err, result) => {
                        if(err) console.log(err);
                    }
                )
            }
        })
        .catch((err)=> console.log(err))
    })
    
    socket.on('getUser', (data) => {
        const { id } = data;
        users.find({
            id: id
        })
        .then((data) =>{
            return socket.emit('getUserData', data);
        })
        .catch((err) => console.log(err))
    })
    socket.on('disconnect', function() {
        delete clients[socket.id];
    });

    socket.on('getUsers', (data) => {
        const { message } = data;
        const options = {
            method: 'GET',
            params: {q: 'logins_count:{0 TO *]', search_engine: 'v3'},
            url: 'https://dev-lma8p4gy.eu.auth0.com/api/v2/users',
            headers: {
                Authorization: `Bearer ${message}`,
            },
            scope: "read:user_idp_tokens",
          };
        
        axios.request(options)
            .then((res) => res.data)
            .then((data)=> socket.emit('getUsersData', data))
            .catch(function (error) {
                console.error(error);
            });
    })

    socket.on('getAdmins', (data) => {
        const { message } = data;
        const options = {
            method: 'GET',
            url: 'https://dev-lma8p4gy.eu.auth0.com/api/v2/roles/rol_T31Z6EKjiFLeoH0T/users',
            headers: {
                Authorization: `Bearer ${message}`,
            },
            scope: "read:users",
          };
        
        axios.request(options)
            .then((res) => res.data)
            .then((data)=> socket.emit('getAdminsData', data))
            .catch(function (error) {
                console.error(error);
            });
    })


})