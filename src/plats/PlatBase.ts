import md5Hex = require("md5-hex");
import uuidv1 = require("uuidv1")
import moment = require("moment");
import { RedisCfg, redisCfg } from "../redis/RedisCfg";
import { RespBase } from "../resp/RespBase";


export interface IPlatServer {
    login(param:LoginParam):Promise<RespBase>;
}

export class PlatBaseServer implements IPlatServer {
    constructor(){};
    async login(param:LoginParam):Promise<RespBase>{
        return null;
    }

    /**
     * 到平台获取签权信息
     */
    async getSignaData() {
    }

    /**
     * 生成平台id
     */
    generateId():string {
        return md5Hex("plat_" + uuidv1() + moment().format("YYYYMMDDHmmss"));
    }

    /**
     * 生成平台token
     */
    generateToken():string {
        return md5Hex("token_" + uuidv1() + moment().format("YYYYMMDDHmmss"));
    }

    async mToken(zxId:string) {
        var token = this.generateToken();
        await redisCfg.set(Constant.REDIS_TOKEN + zxId,token);
        await redisCfg.expire(Constant.REDIS_TOKEN + zxId,24 * 60 * 60);
        return token;
    }

    static async getToken(zxId:string) {
        var token:string = await redisCfg.get(Constant.REDIS_TOKEN + zxId);
        return token;
    }
}

export class Constant {

    static REDIS_TOKEN:string = 'PLATGAME_USER_TOKEN';

    static REDIS_WEIXIN:string = 'PLATGAME_USER_WEIXIN';

    static REDIS_SERVICE:string = 'PLATGAME_SERVICE';

    static REDIS_FBINSTANT:string = "REDIS_FBINSTANT";

    static PLATGAME_SERVICE_RESULT:string = 'PLATGAME_SERVICE_RESULT';
}