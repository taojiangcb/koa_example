import * as sequelize from "sequelize";
import { normal_opt, normal_sync_opt, TablesNames, IDBDefine } from "../DAOBase";

class sys_recharge_log implements IDBDefine {
    tableName: string = TablesNames.sys_recharge_log;
    columns: sequelize.DefineAttributes = {
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
    opt: sequelize.DefineOptions<any> = normal_opt;
    syncOpt: sequelize.SyncOptions = normal_sync_opt;
}

module.exports.model = new sys_recharge_log();

export interface ISys_recharge_log_att {
    id: number,
    zx_id: string,
    order_id: string,
    plat_id: number,
    game_id: number,
    rmb: number,
    money: number,
    node: string,
    createTime: number,
    updateTime: number
}

export interface ISys_recharge_log extends sequelize.Instance<ISys_recharge_log>, ISys_recharge_log_att { }




