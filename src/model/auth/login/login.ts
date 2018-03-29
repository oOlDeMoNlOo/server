import {Socket} from "socket.io";
import {RequestLogin} from "../../../common/request";
import {User} from "../../user/user";
import {Online} from "../../online/online";
import {MySqlUsers} from "../../database/MySqlUsers";
import {ResponseLogin} from "../../../common/response";
import {UserInterface} from "../../../common/userInterface";
import {Md5} from "ts-md5";

export class Login {

    socket: Socket;
    time: Date;
    constructor(private user: User){
        this.socket = user.socket;
        this.socket.on('login',(args) => this.login(args))
        this.socket.on('autoLogin',(args) => this.autoLogin(args))
        this.socket.on('logout', (args) => this.logout(args))
        this.socket.on( 'disconnect', (args) => this.logout(args) )
    }

    private login(data: RequestLogin){
        MySqlUsers.login(data.md5).subscribe(value => {
            this.user.setInfo(value);
            value.user_md5 = "";
            this.socket.emit('login', {status: true, responseObject: value} as ResponseLogin)
            Online.addOnlineUser(this.user);
            console.log(`Пользователь ${value.user_login} c server_id: ${this.socket.id} вошел в систему.`)
        },error => {
            console.log(error)
            this.socket.emit('login', ({status: false, errorId: error.id, error: error.error} as ResponseLogin))
        })
    }

    private logout(data: RequestLogin) {
        if(this.user.info) {
            console.log(`Пользователь ${this.user.info.user_login} c server_id: ${this.socket.id} вышел с системы.`)
            this.user.deleteInfo();
            Online.removeOnlineUser(this.user)
        }
    }

    private autoLogin(data: RequestLogin) {
    }

}