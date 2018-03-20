import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import {Socket} from 'socket.io';
import SocketIO = require('socket.io');
import {ConfigServer} from './config/server';
import {User} from './model/user/user';
import {Online} from "./model/online/online";

export class StudentServer{
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;

    constructor() {
        this.createApp();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }


    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(ConfigServer.PORT,ConfigServer.HOST ,() => {
            console.log(`Сервер запущен на ${ConfigServer.HOST}:${ConfigServer.PORT}`);
        });
            this.io.on('connect', (socket: Socket) => {
            console.log(`Connected client. id: ${socket.id}, ip: ${JSON.stringify(socket.handshake.address)}`);
            new User(socket);
            socket.on('message', (m: string) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
