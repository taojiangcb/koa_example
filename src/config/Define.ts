export interface IConfig {
    my_sql:{
        host:string;
        port:number;
        user:string;
        pwd:string;
        database:string
    },
    setting:{}
}

const Define = {
    writeLogFile:true,
    rootPath:""
}
export {Define}

export const PlatIds = {
    WX:1001,
    QQ:1002,
    FACE_BOOK:1003
}

export class SDKUser {
    zxId: string;
    name: string;
    avatar: string;
    loginToken: string;
    money: number;
    constructor(zxId:string,name:string,avatar:string,loginToken:string,money:number){
        this.zxId = zxId;
        this.name = name;
        this.avatar = avatar;
        this.loginToken = loginToken;
        this.money = money;
    }
}

export class PlatUser {
    userId: string;
    sKey: string;
    constructor(userId:string,sKey:string) {
        this.userId = userId;
        this.sKey = sKey;
    }
}