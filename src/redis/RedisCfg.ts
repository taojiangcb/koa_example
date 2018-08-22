import redis = require("redis");
import { Log } from "../log/Log";
import wrapper = require("co-redis");


export class RedisCfg {
    ip:string = "47.100.202.222";
    port:number = 6379;

    private redisClient:redis.RedisClient = null;
    private redisco;
    
    constructor(address:string = "47.100.202.222",port:number=6379) {
        this.ip = address,this.port = port;
    }

    init():void {
        let clientPot:redis.ClientOpts = {
            port:this.port,
            host:this.ip,
        }

        this.redisClient = redis.createClient(clientPot);
        this.redisco = wrapper(this.redisClient);
        
        this.redisClient.on("error",this.errorHandler);
        this.redisClient.on("ready",this.readyHandler);
        this.redisClient.on("disconnect",this.disconnectHandler);
        this.redisClient.on("reconnecting",this.reconnectHandler);
    }

    errorHandler(message:string) {
        Log.infoLog(message);
    }

    readyHandler(err){
        if(err) {
            Log.infoLog(err);
        } else {
            Log.infoLog("ready");
            Log.infoLog("redis 连接成功!!")
        }
    }

    disconnectHandler(){
        Log.infoLog("disconnectHandler");
    }

    reconnectHandler(err, reply){
        Log.infoLog('reconnecting' + err + '|' + reply);
    }

    async del(key:string) {
        return await this.redisco.del(key);
    }

    async expire(key:string,seconds:number) {
        //this.redisClient.expire()
        return await this.redisco.expire(key,seconds);
    }

    async set(key:string,value:string) {
        return await this.redisco.set(key,value);
    }

    async get(key:string) {
        return await this.redisco.get(key);
    }

    /**
     * 自增1
     * @param key 
     */
    async incr(key:string) {
        return await this.redisco.incr(key);
    }

    /**
     * 自减1
     * @param key 
     */
    async decr(key:string) {
        return await this.redisco.decr(key);
    }

    
    /**
     * 将 key 的值设为 value ，当且仅当 key 不存在。
     * 若给定的 key 已经存在，则 SETNX 不做任何动作。
     * 设置成功：1， 设置失败：0
     */
    async setnx(key:string,value:string) {
        return await this.redisco.setnx(key,value);
    }

    //==========================================================================list==========================================

    /**
     * 从头部写入一个或多个数据到Lists
     * 
     */
    async lpush(key:string,value:string) {
        return await this.redisco.lpush(key,value);
    }

    /**
     * 从尾部写入一个或多个数据到Lists
     * @type {Function}
     */
    async rpush(key:string,value:string){
        return await this.redisco.rpush(key,value);
    }

    /**
     * 从lists头部拿数据,后进先出
     * @type {Function}
     */
    async lpop(key:string) {
        return await this.redisco.lpop(key);
    }

    /**
     * 从lists头部拿数据,后进先出
     * @type {Function}
     */
    async rpop(key:string) {
        return await this.redisco.rpop(key);
    }

    /**
     * 从lists头部拿数据,后进先出
     * @type {Function}
     */
    async llen(key:string) {
        return await this.redisco.llen(key);
    }

    //===================================================hashtable==============================================
    
     /**
     * 写入hash
     * @type {Function}
     */
    async hset(key:string,field:string,value:string) {
        return await this.redisco.hset(key,field,value);
    }

    /**
     * 批量写入hash
     * @type {Function}
     * @fields {Object}
     */
    async hmset(key:string,fields:any) {
        return this.redisco.hmset(key,fields);
    }


    /**
     * 获取hash值
     * @type {Function}
     */
    async hget(key:string,field:string) {
        return await this.redisco.hget(key,field);
    }

    /**
     * 获取所有hash值
     * @type {Function}
     */
    async hgetall(key:string) {
        return await this.redisco.hgetall(key);
    }

    /**
     * 删除hash单个域
     * @type {Function}
     */
    async hdel(key:string,field:string) {
        return await this.redisco.hedl(key,field);
    }

    get client() {
        return this.redisClient;
    }

    get clientCo() {
        return this.redisco;
    }
}