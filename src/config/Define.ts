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



