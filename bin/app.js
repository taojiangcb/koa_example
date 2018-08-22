"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const SequelizeConfig_1 = require("./src/config/SequelizeConfig");
const Define_1 = require("./src/config/Define");
const Log_1 = require("./src/log/Log");
let app = new Koa();
let router = new Router();
let svrPath = "/src/servers";
Define_1.Define.rootPath = __dirname;
function initServers() {
    var server_files;
    var files = fs.readdirSync(`${__dirname}${svrPath}`);
    server_files = files.filter((f) => {
        return f.endsWith(".js");
    }, this);
    server_files.forEach(f => {
        let mapping = require(`${__dirname}${svrPath}/${f}`);
        for (var url in mapping) {
            if (url.startsWith("GET")) {
                let funs = url.split(/\s+/i);
                console.log(funs);
                router.get(funs[0], mapping[url]);
            }
            else if (url.startsWith("POST")) {
                let funs = url.split(/\s+/i);
                console.log(funs);
                router.post(funs[0], mapping[url]);
            }
            else {
                console.log("未知服务:" + url);
            }
        }
    });
}
initServers();
/**
 * 当node 进程崩溃的时候处理
 */
process.addListener("uncaughtException", (err) => {
    if (err.message) {
        console.log(err.message);
    }
    if (err.stack) {
        console.log(err.stack);
    }
});
/**
 * 当node 进程退出时候处理
 */
process.addListener("exit", (code) => {
    console.log("exit code" + code);
});
/**
 * hello world
 */
router.get("/*", (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = "hello world";
}));
var config_path = `config_${process.env.NODE_ENV}.json`;
var config = JSON.parse(fs.readFileSync(__dirname + '/' + config_path).toString());
exports.config = config;
var define_pro = Define_1.Define;
var overrideDefine = Object.assign(define_pro, config.setting);
for (const key in overrideDefine) {
    if (overrideDefine.hasOwnProperty(key)) {
        const element = overrideDefine[key];
        Define_1.Define[key] = element;
    }
}
console.log(Define_1.Define);
/** 初始化数据库 */
var sequelizeCfg = new SequelizeConfig_1.SequelizeConfig();
exports.sequelizeCfg = sequelizeCfg;
sequelizeCfg.init(() => {
    //dbTestInstall();
    Log_1.Log.infoLog("数据库准备成功");
}, () => {
    Log_1.Log.errorLog("数据库准备失败");
});
app.use(router.routes);
app.listen(3000);
Log_1.Log.infoLog("server runing on port 3000");
//# sourceMappingURL=app.js.map