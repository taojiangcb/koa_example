import { IPlatServer, PlatBaseServer } from "./PlatBase";
import { PlatIds } from "../config/Define";
import { define } from "mime";
import { PlatWXServer } from "./PlatWXServer";

export class PlatFactory {
    platServer:IPlatServer = null;
    async getInstance(platId:number) {
        switch(platId) {
            case PlatIds.WX:
            this.platServer = new PlatWXServer();
            break;
            default:
            this.platServer = new PlatBaseServer();
            break;
        }
        return this.platServer;
    }
}

export var platFactory:PlatFactory = new PlatFactory();