import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import {Socket} from 'socket.io';
import SocketIO = require('socket.io');

export class StudentServer{
    public static PORT = 4201;
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
        this.server.listen(StudentServer.PORT, () => {
            console.log('Running server on PORT %s', StudentServer.PORT);
        });

        this.io.on('connect', (socket: Socket) => {
            console.log(`Connected client. id: ${socket.id}, ip: ${JSON.stringify(socket.handshake.address)}`);
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
