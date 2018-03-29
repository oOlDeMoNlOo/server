import {Observable} from "rxjs/Observable";
import {UserInterface} from "../../common/userInterface";
import {MySqlCommon} from "./MySqlCommon";
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";
import {Online} from "../online/online";

export class MySqlUsers {

    public static getAllUsersI() {
        return MySqlCommon.queryI<UserInterface>("select * from users")
    }

    public static login(md5: string) {
        return new Observable<UserInterface>(subscriber => {
            MySqlCommon.query<UserInterface[]>(`select * from users where user_md5='${md5}'`).subscribe(value => {
                    if (value.length < 1) {
                        subscriber.error({id: 1, error: "Не верный логин или пароль."})
                    } else if (value.length > 1) {
                        subscriber.error({id: 2, error: "Ошибка md5."})
                    } else {
                        if (Online.getUserByUsername(value[0].user_name)) {
                            subscriber.error({id: 3, error: "Такой пользователь уже вошеrл."})
                        } else {
                            subscriber.next(value[0]);
                            subscriber.complete();
                        }
                    }
                }
            )
        })
    }
}