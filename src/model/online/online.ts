import {User} from '../user/user';

export class Online {
    private userOnline: User[];

    constructor() {
    }

    addOnlineUser(user: User): void {
        this.userOnline.push(user);
    }

    removeOnlineUser(user: User): void{
        this.userOnline.splice(this.userOnline.indexOf(user), 1);
    }

    get(): User[] {
        return this.userOnline;
    }

    count(): number{
        return this.userOnline.length;
    }
}