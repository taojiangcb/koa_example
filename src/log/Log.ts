import log4js = require("log4js");
import { Define } from "../config/Define";
import path = require("path");


var ca: log4js.ConsoleAppender = {
    type: "console"
}

var logFileAppender: log4js.FileAppender = {
    type: "file",
    filename: path.resolve(Define.rootPath,"./logOut.log"),
}

var infoFileAppender: log4js.DateFileAppender = {
    type: "dateFile",
    filename: path.resolve(Define.rootPath,"./logs/info"),
    pattern: "-yyyy-MM-dd-hh-mm-ss.log",
    alwaysIncludePattern:true,
    layout:{
        type:"messagePassThrough"
    },
    keepFileExt:false,
    encoding:"utf-8"
}

let logCfg: log4js.Configuration = {
    appenders: {
        default: ca,
        fileLog: logFileAppender,
        infoLog: infoFileAppender
    },
    categories: {
        default: { appenders: ['default'], level: 'all' },
        fileLog: { appenders: ["fileLog"], level: "all" },
        infoFile: { appenders: ["infoLog"], level: "all" }
    }
}

log4js.configure(logCfg);
let devLogger = log4js.getLogger("default");
let fileLogger = log4js.getLogger("fileLog");
let infoLogger = log4js.getLogger("infoLog");

function log(msg: string, ...args) {
    devLogger.debug(msg, args);
    if (Define.writeLogFile) {
        fileLogger.debug(msg, args);
    }
}

function infoLog(msg:string,...args) {
    infoLogger.info(msg,args);
    infoLogger.info("-------------------------------------------------------------------");
    fileLogger.info(msg, args);
}

export var Log = { 
    log: log,
    infoLog:infoLog,
};