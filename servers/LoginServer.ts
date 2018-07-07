
async function login(ctx,next) {
    console.log("the call login function")
    var body = ctx.request.body;        //接收post 请求参数
    console.log(body);

    return ctx.response.body = body;
}

async function login_get(ctx,netx) {
    console.log("the call login_get function")
    var query = ctx.request.querty;     //接收get 请求参数
    console.log(query);

    //返回
    return ctx.response.body = query;
}

/**
 * 导出接口
 */
module.exports = {
    'POST /login/login':login,
    'GET /login/login_get':login_get
}