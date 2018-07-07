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
let app = new Koa();
let router = new Router();
function initServers() {
    var server_files;
    var files = fs.readdirSync(__dirname + "/servers");
    server_files = files.filter((f) => {
        return f.endsWith(".js");
    }, this);
    server_files.forEach(f => {
        let mapping = require(__dirname + "/servers/" + f);
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
router.get("/*", (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = "hello world";
}));
app.use(router.routes);
app.listen(3000);
console.log("server runing on port 3000");
//# sourceMappingURL=app.js.map