import * as sequelize from "sequelize";


export interface IDBDefine {
    tableName:string;
    columns:sequelize.DefineAttributes;
    opt: sequelize.DefineOptions<any>;
    syncOpt: sequelize.SyncOptions;
}


export const TablesNames = {
    sys_user: "sys_user",
    sys_user_game: "sys_user_game",
    sys_user_plat: "sys_user_plat",
    sys_recharge_log: "sys_recharge_log"
}

export const normal_sync_opt: sequelize.SyncOptions = {
    force: false,
}

export const normal_opt: sequelize.DefineOptions<any> = {
    timestamps: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
    deletedAt: "deleteTime"
}




