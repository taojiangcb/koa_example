import { ErrorLanguage } from "../language/CN";

export class RespBase {
    succeed:boolean;
    data:any;
    errorCode:number = 0;

    constructor(succeed:boolean,errCode:number = 0,data?:any){
        this.succeed = succeed;
        this.data = data;
        this.errorCode;
        if(errCode != 0 && !data) {
            let errMsg:string = ErrorLanguage[this.errorCode];
            if(errMsg) {
                data = errMsg;
            }
        }
    }
}