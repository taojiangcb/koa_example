"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeConfig_1 = require("../config/SequelizeConfig");
const app_1 = require("../../app");
function dbTestInstall() {
    let sys_recharge = app_1.sequelizeCfg.tables[SequelizeConfig_1.TablesNames.sys_recharge_log];
    sys_recharge.create({ zx_id: "12306", plat_id: 10000, game_id: 10000, rmb: 1, moeny: 1 })
        .then((res) => {
        console.log("插入陈宫");
    })
        .catch((err) => {
        console.log(err.message);
    });
}
exports.dbTestInstall = dbTestInstall;
//# sourceMappingURL=DBMgrTest.js.map