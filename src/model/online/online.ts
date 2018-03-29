import {User} from '../user/user';

export class Online {
    private static userOnline: User[] = [];

    constructor() {
    }

    static addOnlineUser(user: User): void {
        this.userOnline.push(user);
    }

    static removeOnlineUser(user: User): void{
        this.userOnline.splice(this.userOnline.indexOf(user), 1);
    }

    static get(): User[] {
        return this.userOnline;
    }

    static count(): number{
        return this.userOnline.length;
    }

    static getUserByUsername(username: string): User{
        return this.userOnline.find((value, index) => value.info.user_name == username);
    }
}