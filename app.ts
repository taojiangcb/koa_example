import * as Koa from "koa";
import * as Router from "koa-router";
import { EventEmitter } from "events";
import { eventNames } from "cluster";
import * as fs from "fs";

let app = new Koa();
let router = new Router();


function initServers():void {
    var server_files:string[];
    var files = fs.readdirSync(__dirname + "/servers");
    server_files = files.filter((f)=>{
        return f.endsWith(".js");
    },this);
    
    server_files.forEach(f => {
        let mapping = require(__dirname + "/servers/" + f);
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


app.use(router.routes);
app.listen(3000);
console.log("server runing on port 3000");