import { Options } from "sequelize";
import { config } from "../../../app";

export const TABLE_NAME = {
    sys_user:"sys_user",
}

export var SQLDefine = {
    opts:()=>{
        let opts: Options = {
            host: config.my_sql.host,
            port: config.my_sql.port,
            dialect: "mysql",
            username: config.my_sql.user,
            password: config.my_sql.pwd,
            database: config.my_sql.database,
        };
        return opts
    },
}