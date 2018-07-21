"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const Define_1 = require("../config/Define");
var ca = {
    type: "console"
};
let outPath = `${__dirname}/logOut.log`;
var logFile = {
    type: "file",
    filename: outPath
};
let logCfg = {
    appenders: {
        default: ca,
        logFile: logFile
    },
    categories: {
        default: { appenders: ['default'], level: 'ALL' },
        logFile: { appenders: ["logFile"], level: "ALL" }
    }
};
log4js.configure(logCfg);
let devLog = log4js.getLogger("default");
let fileLog = log4js.getLogger("logFile");
function log(msg, ...args) {
    devLog.debug(msg, args);
    if (Define_1.Define.writeLogFile) {
        fileLog.debug(msg, args);
    }
}
exports.Log = { log: log };
//# sourceMappingURL=Log.js.map