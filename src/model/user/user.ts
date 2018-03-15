///<reference path="../../../node_modules/@types/bcrypt/index.d.ts"/>
import {Socket} from 'socket.io';
import {compare, genSalt, hash} from 'bcrypt';

export class User {
    private id: string;
    private name: string;

    constructor() {
        //this.id = socket.id;
        hash('asdasdasd', 10, (err, encrypted) => {
            console.log(err);
            console.log(encrypted);
            compare('asdasdasd', encrypted, function(err, res) {
                console.log(res, err);
            });

        })

    }
}