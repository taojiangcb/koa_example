import * as Koa from "koa";
import * as Router from "koa-router";
import { EventEmitter } from "events";
import { eventNames } from "cluster";
import * as fs from "fs";
import { SequelizeConfig } from "./src/config/SequelizeConfig";
import { IConfig, Define } from "./src/config/Define";
import { dbTestInstall } from "./src/test/DBMgrTest";
import { Log } from "./src/log/Log";

let app = new Koa();
let router = new Router();
let svrPath:string = "/src/servers";
Define.rootPath = __dirname;

function initServers():void {
    var server_files:string[];
    var files = fs.readdirSync(`${__dirname}${svrPath}`);
    server_files = files.filter((f)=>{
        return f.endsWith(".js");
    },this);
        
    server_files.forEach(f => {
        let mapping = require(`${__dirname}${svrPath}/${f}`);
        for(var url in mapping) {
            if(url.startsWith("GET")) {
                let funs:string[] = url.split(/\s+/i);
                console.log(funs);
                router.get(funs[0],mapping[url]);
            } else if(url.startsWith("POST")) {
                let funs:string[] = url.split(/\s+/i);
                console.log(funs);
                router.post(funs[0],mapping[url]);
            } else {
                console.log("未知服务:" + url);
            }
        }
    });
}
initServers();

/**
 * 当node 进程崩溃的时候处理
 */
process.addListener("uncaughtException",(err:Error)=>{
    if(err.message) {
        console.log(err.message);
    }
    if(err.stack) {
        console.log(err.stack);
    }
})

/**
 * 当node 进程退出时候处理
 */
process.addListener("exit",(code:number)=>{
    console.log("exit code" + code);
});


/**
 * hello world
 */
router.get("/*",async(ctx)=>{
    ctx.body = "hello world";
});

var config_path:string = `config_${process.env.NODE_ENV}.json`;
var config:IConfig = JSON.parse(fs.readFileSync(__dirname + '/' + config_path).toString());

/** 初始化数据库 */
var sequelizeCfg:SequelizeConfig = new SequelizeConfig();
sequelizeCfg.init(()=>{
    console.log("数据库准备成功");
    dbTestInstall();
}
,()=>{
    console.log("数据库准备失败");
});

app.use(router.routes);
app.listen(3000);
//Log.log("server runing on port 3000");
Log.infoLog("server runing on port 3000");

export {config,sequelizeCfg}