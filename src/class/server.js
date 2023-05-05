const express = require('express');
const socketIO = require('socket.io');
const http = require("http")


class Server{
    #instance = Server
    _app = express.application;
    port = Number;
    io= socketIO.Server;
    httpServer = http.Server;

    constructor(){
        this.app = express();
        this.port = process.env.SERVER_PORT

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();

    }

    static get instance(){
        return this.#instance || (this.#instance = new this());
    }

    escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection',cliente => {
            console.log('Cliente Conectado');
        })
    }
}

const controllerServer = new Server();
module.export = controllerServer 