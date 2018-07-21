import { SequelizeConfig, TablesNames } from "../config/SequelizeConfig";
import { sequelizeCfg } from "../../app";


export function dbTestInstall():void {
    let sys_recharge = sequelizeCfg.tables[TablesNames.sys_recharge_log];
    sys_recharge.create({zx_id:"12306",plat_id:10000,game_id:10000,rmb:1,moeny:1})
    .then((res)=>{
        console.log("插入陈宫");
    })
    .catch((err)=>{
        console.log(err.message);
    });
}