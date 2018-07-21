import log4js = require("log4js");
import { Define } from "../config/Define";

var ca: log4js.ConsoleAppender = {
    type: "console"
}

let outPath:string = `${__dirname}/logOut.log`;
var logFile: log4js.FileAppender = {
    type: "file",
    filename: outPath
}

let logCfg: log4js.Configuration = {
    appenders: {
        default: ca,
        logFile: logFile
    },
    categories: {
        default: { appenders: ['default'], level: 'ALL' },
        logFile: { appenders: ["logFile"], level: "ALL" }
    }
}
log4js.configure(logCfg);
let devLog = log4js.getLogger("default");
let fileLog = log4js.getLogger("logFile");

function log(msg: string, ...args) {
    devLog.debug(msg, args);
    if (Define.writeLogFile) {
        fileLog.debug(msg,args);
    }
}

export var Log = { log: log };





