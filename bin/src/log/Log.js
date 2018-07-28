"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const Define_1 = require("../config/Define");
const path = require("path");
var ca = {
    type: "console"
};
var logFileAppender = {
    type: "file",
    filename: path.resolve(Define_1.Define.rootPath, "./logOut.log"),
};
var infoFileAppender = {
    type: "dateFile",
    filename: path.resolve(Define_1.Define.rootPath, "./logs/info"),
    pattern: "-yyyy-MM-dd-hh-mm-ss.log",
    alwaysIncludePattern: true,
    layout: {
        type: "messagePassThrough"
    },
    keepFileExt: false,
    encoding: "utf-8"
};
let logCfg = {
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
};
log4js.configure(logCfg);
let devLogger = log4js.getLogger("default");
let fileLogger = log4js.getLogger("fileLog");
let infoLogger = log4js.getLogger("infoLog");
function log(msg, ...args) {
    devLogger.debug(msg, args);
    if (Define_1.Define.writeLogFile) {
        fileLogger.debug(msg, args);
    }
}
function infoLog(msg, ...args) {
    infoLogger.info(msg, args);
    infoLogger.info("-------------------------------------------------------------------");
    fileLogger.info(msg, args);
}
exports.Log = {
    log: log,
    infoLog: infoLog,
};
//# sourceMappingURL=Log.js.map