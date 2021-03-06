import { Sequelize, DefineOptions } from "sequelize";
import * as sequelize from "sequelize";
import { EventEmitter } from "events";
import { config } from "../../app";
import fs = require("fs");
import path = require("path");
import { IDBDefine } from "./DAOBase";

export class SequelizeConfig extends EventEmitter {
    sequelize: Sequelize;

    /**
     * 当前的数据模型缓存对象
     */
    private dbTables: { [key: string]: sequelize.Model<any, any> } = {};

    /**
     * @param connectionSuccess 
     * @param connectionFail 
     */
    public async init(connectionSuccess: Function, connectionFail: Function) {
        
        let opt: sequelize.Options = {
            host: config.my_sql.host,
            port: config.my_sql.port,
            dialect: "mysql",
            logging: this.logHandler.bind(this)
        };
        this.sequelize = new sequelize(config.my_sql.database, config.my_sql.user, config.my_sql.pwd, opt);
        this.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
            this.initDataBase();
            connectionSuccess && connectionSuccess();
        })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                connectionFail && connectionFail();
            })
    }

    //定义数据模型
    private initDataBase(): void {
        this.createOrSyncTable(sys_user);
        this.createOrSyncTable(sys_user_game);
        this.createOrSyncTable(sys_user_plat);
        this.importFromFile();
        // this.createOrSyncTable(sys_recharge_log);
    }

    private importFromFile() {
        var dao_path = path.resolve(__dirname,"dao");
        var files = fs.readdirSync(dao_path);
        var jsFiles = files.filter(f=>{return f.endsWith(".js")});
        jsFiles.forEach(fname => {
            let name = fname.substring(0,fname.length - 3);
            let d = require(dao_path + "/" + name);
            if(d && d.model) {
                let dao:IDBDefine = d.model;
                if(dao) {
                    let table = this.sequelize.define(dao.tableName,dao.columns,dao.opt);
                    table.sync(dao.syncOpt).then(value => {
                        console.debug(`sync:${dao.tableName} force:${dao.syncOpt.force}`);         
                        this.dbTables[dao.tableName] = table;
                    })
                }
            }
        });
    }

    private createOrSyncTable(T: any): void {
        let table = this.sequelize.define(T.tableName, T.columns, T.opt);
        table.sync(T.syncOpt).then((value) => {
            console.debug(`sync:${T.tableName} force:${T.syncOpt.force}`);
        });
        this.dbTables[T.tableName] = table;
    }

    /**
     * mysql log 日志输出
     * @param sql 
     * @param time 
     */
    private logHandler(sql: string, time: number) {
        console.debug(`sql:${sql} runTime:${time}`);
        let eventParam: any = {
            sql_text: sql.replace('Executed (default):', ''),
            const_time: time
        }
        this.emit(SequelizeEvents.RECORD, eventParam);
    }

    public get tables() {
        return this.dbTables;
    }

    public getTable(tableName: string): sequelize.Model<any, any> {
        return this.dbTables[tableName];
    }

    getTableInstant<T,T1>(tableName):sequelize.Model<T,T1> {
        return this.dbTables[tableName];
    }
}

export var sequelizeInst = new SequelizeConfig();

/**
 * 数据库操作事件
 */
export class SequelizeEvents {
    static RECORD: string = "record";
}

export const TablesNames = {
    sys_user: "sys_user",
    sys_user_game: "sys_user_game",
    sys_user_plat: "sys_user_plat",
    sys_recharge_log: "sys_recharge_log"
}

var normal_sync_opt: sequelize.SyncOptions = {
    force: false,
}

var normal_opt: sequelize.DefineOptions<any> = {
    timestamps: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
    deletedAt: "deleteTime"
}

class sys_user {
    static tableName: string = TablesNames.sys_user;
    static columns: sequelize.DefineAttributes = {
        zx_id: { type: sequelize.STRING(64), primaryKey: true, allowNull: false },
        money: { type: sequelize.DECIMAL(10), defaultValue: 0 },
        user_name: { type: sequelize.STRING(50) },
        pwd: { type: sequelize.STRING(50) },
        name: { type: sequelize.STRING(100) },
        avatar: { type: sequelize.STRING(300) },
        loginToken: { type: sequelize.STRING(300) },
        createTime: { type: sequelize.DATE, defaultValue: new Date() },
        updateTime: { type: sequelize.DATE, defaultValue: new Date() }
    }
    static opt: sequelize.DefineOptions<any> = normal_opt;
    static syncOpt: sequelize.SyncOptions = normal_sync_opt;
}

class sys_user_game {
    static tableName: string = TablesNames.sys_user_game;
    static columns: sequelize.DefineAttributes = {
        zx_id: { type: sequelize.STRING(64), primaryKey: true, allowNull: false },
        plat_id: { type: sequelize.INTEGER(4) },
        game_id: { type: sequelize.INTEGER(4) },
        rmb: { type: sequelize.BIGINT, defaultValue: 0 },
        sandbox_rmb: { type: sequelize.BIGINT, defaultValue: 0 },
        money: { type: sequelize.BIGINT },
        createTime: { type: sequelize.DATE, defaultValue: new Date() },
        updateTime: { type: sequelize.DATE, defaultValue: new Date() }
    }
    static opt: sequelize.DefineOptions<any> = normal_opt;
    static syncOpt: sequelize.SyncOptions = normal_sync_opt;
}

//type TClass = {tableName:string}

class sys_user_plat {
    static tableName: string = TablesNames.sys_user_plat;
    static columns: sequelize.DefineAttributes = {
        zx_id: { type: sequelize.STRING(64), primaryKey: true, allowNull: false },
        plat_id: { type: sequelize.INTEGER(4) },
        userId: { type: sequelize.STRING },
        unionId: { type: sequelize.STRING },
        createTime: { type: sequelize.DATE, defaultValue: new Date() },
        updateTime: { type: sequelize.DATE, defaultValue: new Date() }
    }
    static opt: sequelize.DefineOptions<any> = normal_opt;
    static syncOpt: sequelize.SyncOptions = normal_sync_opt;
}

class sys_recharge_log {
    static tableName: string = TablesNames.sys_recharge_log;
    static columns: sequelize.DefineAttributes = {
        id: { type: sequelize.INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
        zx_id: { type: sequelize.STRING(64), allowNull: false },
        order_id: { type: sequelize.STRING(200) },
        plat_id: { type: sequelize.INTEGER(11) },
        game_id: { type: sequelize.INTEGER(11) },
        rmb: { type: sequelize.DECIMAL(10, 2) },
        money: { type: sequelize.DECIMAL(10, 2) },
        node: { type: sequelize.STRING(200) },
        createTime: { type: sequelize.DATE, defaultValue: new Date() },
        updateTime: { type: sequelize.DATE, defaultValue: new Date() }
    }

    static opt: sequelize.DefineOptions<any> = normal_opt;
    static syncOpt: sequelize.SyncOptions = normal_sync_opt;
}
