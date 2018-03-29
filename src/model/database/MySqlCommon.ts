import * as MySql from 'mysql'
import {ConfigMySql} from "../../config/mysql";
import {Observable} from "rxjs/Observable";
import {Connection, ConnectionConfig, Query} from "mysql";
import {MysqlError} from "mysql";
import {UserInterface} from "../../common/userInterface";
import "rxjs/add/operator/timeInterval";
import "rxjs/add/observable/timer";

export class MySqlCommon {
    private static mySqlConfig: ConnectionConfig;
    private static mySqlConnection: Connection;

    constructor() {
        MySqlCommon.mySqlConfig = {
            host: ConfigMySql.HOST,
            port: ConfigMySql.PORT,
            user: ConfigMySql.USER,
            password: ConfigMySql.PASSWORD,
            database: ConfigMySql.DATABASE
        }
    }

    connect() {
        MySqlCommon.mySqlConnection = MySql.createConnection(MySqlCommon.mySqlConfig);
        MySqlCommon.mySqlConnection.connect((err: MysqlError) => {
            if (err) throw err;
            console.log(`Подключен к MySQL серверу по адресу ${ConfigMySql.HOST}:${ConfigMySql.PORT}, `
                + `пользователь ${ConfigMySql.USER}, база данных ${ConfigMySql.DATABASE}`);
        })
    }

    static query<T>(query: Query | string) {
        return new Observable<T>(subscriber => {
            MySqlCommon.mySqlConnection.query(query, (err: MysqlError, result: T) => {
                if (err) subscriber.error(err)
                subscriber.next(result);
                subscriber.complete();
            });
        })
    }

    static queryI<T>(query: Query | string) {
        return new Observable(subscriber => {
            MySqlCommon.mySqlConnection.query(query, (err: MysqlError, result: T[]) => {
                Observable.from(result).subscribe(
                    value => subscriber.next(value),
                    error => subscriber.error(err),
                    () => subscriber.complete())
            });
        })
    }

    public static MySql(): Connection {
        return this.mySqlConnection;
    }
}