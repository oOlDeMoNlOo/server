///<reference path="../../../node_modules/@types/bcrypt/index.d.ts"/>
import {Socket} from 'socket.io';
import {Login} from "../auth/login/login";

export class User {
    private id: string;
    private name: string;

    constructor(public socket: Socket) {
        new Login(this);
    }


}