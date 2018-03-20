import {Socket} from "socket.io";
import {RequestLogin} from "../../../common/request";
import {User} from "../../user/user";
import {Online} from "../../online/online";

export class Login {

    socket: Socket;

    constructor(private user: User){
        this.socket = user.socket;
        this.socket.on('login',(args) => this.login(args))
        this.socket.on('autoLogin', this.autoLogin)
        this.socket.on('logout', this.logout)
    }

    private login(data: RequestLogin){
        this.socket.emit('login', {status: true})
        Online.addOnlineUser(this.user);
    }

    private logout(data: RequestLogin) {
        Online.removeOnlineUser(this.user)
    }

    private autoLogin(data: RequestLogin) {

    }
}