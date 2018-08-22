


export interface IPlatServer {
    login(param:LoginParam);
}

export class PlatBaseServer implements IPlatServer {
    constructor(){};
    async login(param:LoginParam){
    }
}