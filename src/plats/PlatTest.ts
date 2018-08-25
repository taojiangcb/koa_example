import { PlatBaseServer } from "./PlatBase";
import { RespBase } from "../resp/RespBase";
import { ErrorLanguage } from "../language/CN";
import { DBTools } from "../database/DBTools";
import { ErrorCode } from "../config/ErrorCode";
import { SDKUser, PlatUser } from "../config/Define";

export class PlatTest extends PlatBaseServer {
    constructor(){
        super();
    }

    async login(body:LoginParam) {
        if(body.platUser) {
            var signaData:any = true;
            let userId:string = body.platUser.openId;
            let userKey:string = body.platUser.openKey;
            let platuser = await DBTools.getPlatUser(body.plat,userId);
            if(platuser) {
                let zxId= platuser.zx_Id;
                let user_game =await DBTools.sys_user_game_table().findOne({
                    where:{zx_id:zxId}
                })
                if(!user_game) return new RespBase(false,ErrorCode.ERR_1001);

                let sys_user = await DBTools.sys_user_table().findOne({
                    where:{zx_id:zxId}
                })
                if(!sys_user) return new RespBase(false,ErrorCode.ERR_1002);

                let change:boolean = false;
                if(sys_user.avatar != body.avatar && body.avatar) {
                    sys_user.avatar = body.avatar;
                    change = true;
                }

                if(sys_user.name != body.name && body.name) {
                    sys_user.name = body.name;
                    change = true;
                }
                
                if(change) {
                    await sys_user.save();
                }
                
                let token:string = await this.mToken(zxId);
                let respData = {
                    user:new SDKUser(zxId,body.name,body.avatar,token,sys_user.money),
                    platUser:new PlatUser(userId,userKey)
                }
                return new RespBase(true,0,respData);
            }
            else {
                let zxId:string = this.generateId();
                let token:string = await this.mToken(zxId);
                return await DBTools.createUser(body.plat,userId,zxId,body.gameId,body.name,body.avatar,userKey);
            }
        }
        else {
            return new RespBase(false,ErrorCode.ERR_1001);
        }
    }
}