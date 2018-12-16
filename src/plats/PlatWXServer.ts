import { PlatBaseServer } from "./PlatBase";
import { RespBase } from "../resp/RespBase";

export class PlatWXServer extends PlatBaseServer {
    constructor(){
        super();
    }

    async login(param:LoginParam):Promise<RespBase> {
        return null;
    }
}