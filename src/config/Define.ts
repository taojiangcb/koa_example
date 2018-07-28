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



