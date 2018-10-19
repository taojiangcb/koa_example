import { TablesNames, sequelizeInst } from "./SequelizeConfig";
import { Transaction } from "sequelize";
import { RespBase } from "../resp/RespBase";
import { ErrorCode } from "../config/ErrorCode";
import * as sequelize from "sequelize";
import { SDKUser, PlatUser } from "../config/Define";
import { PlatBaseServer } from "../plats/PlatBase";

//import { SequelizeConfig } from "../config/SequelizeConfig";

async function getPlatUser(platId:number,userid:string) {
  let userTable = sequelizeInst.getTable(TablesNames.sys_user);
  return userTable.findOne({
      where:{
          plat_id:platId,
          userId:userid
      }
  });
}

async function createUser(platId:number,userId:string,zxId:string,gameId:number,name:string,avatar:string,userKey:string){
    var t:Transaction = await sequelizeInst.sequelize.transaction();
    try {
        let userGame = sequelizeInst.getTable(TablesNames.sys_user_game);
        let users = sequelizeInst.getTable(TablesNames.sys_user);
        let platUser = sequelizeInst.getTable(TablesNames.sys_user_plat);

        await userGame.create({zx_id:zxId,game_id:gameId,plat_id:platId},{transaction:t});
        await users.create({zx_id:zxId,user_name:name,avatar:avatar},{transaction:t});
        await platUser.create({zx_id:zxId,userId:userId,plat_id:platId},{transaction:t});
        t.commit();

        let token:string = await PlatBaseServer.getToken(zxId);

        let respData = {
            user:new SDKUser(zxId,name,avatar,token,0),
            platUser:new PlatUser(userId,userKey)
        }

        return new RespBase(true);
    } 
    catch(e) {
        !t["finished"] && t.rollback();
        return new RespBase(false,ErrorCode.ERR_1001);
    }
}

function sys_user_table():sequelize.Model<any,any> {
    return sequelizeInst.getTable[TablesNames.sys_user];
}

function sys_user_game_table():sequelize.Model<any,any> {
    return sequelizeInst.getTable[TablesNames.sys_user_game];
}

function sys_user_plat_table():sequelize.Model<any,any> {
    return sequelizeInst.getTable[TablesNames.sys_user_plat];
}

function sys_recharge_log_table():sequelize.Model<any,any> {
    return sequelizeInst.getTable[TablesNames.sys_recharge_log];
}

export var DBTools = {
    getPlatUser:getPlatUser,
    createUser:createUser,
    sys_user_table:sys_user_table,
    sys_user_game_table:sys_user_game_table,
    sys_user_plat_table:sys_user_plat_table,
    sys_recharge_log_table:sys_recharge_log_table
};