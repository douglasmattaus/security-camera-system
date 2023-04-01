const express = require('express');
const fs = require("fs");
const fsExtra = require('fs-extra');

const app = express();
const port = process.env.PORT || 3000
const server = app.listen(port);

app.use(express.static('public'));

app.use('/images', express.static('images'));

const socket = require('socket.io');
const io = socket(server);

io.sockets.on('connection', (socket)=>{
    console.log('Usuário conectado')
    socket.on('image-encoded', (image)=>{
        //console.log(image)
        const imagePath = `images/camera${Date.now()}.jpg`
        const buffer = Buffer.from(image, "base64");
        fsExtra.emptyDirSync('images/');
        fs.writeFileSync(imagePath, buffer);
        socket.broadcast.emit('new-image', imagePath)
    })


})
