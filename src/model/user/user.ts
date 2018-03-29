///<reference path="../../../node_modules/@types/bcrypt/index.d.ts"/>
import {Socket} from 'socket.io';
import {Login} from "../auth/login/login";
import {UserInterface} from "../../common/userInterface";

export class User {
    info: UserInterface;

    constructor(public socket: Socket) {
        new Login(this);
    }

    setInfo(info : UserInterface){
        this.info = info;
    }

    deleteInfo(){
        delete this.info;
    }

}