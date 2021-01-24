
var CCWebSocket = require("./CCWebSocket.js")
CCWebSocket.start_websocket_server();

module.exports = {
  // 模块介绍
  summary: 'hcc>> anyproxy_rule.js',
   /*
    //requestDetail
    protocol {string} 请求使用的协议，http或者https
    requestOptions {object} 即将发送的请求配置，供require('http').request作为使用。详见：https://nodejs.org/api/http.html#http_http_request_options_callback
    requestData {object} 请求Body
    url {string} 请求url
    _req {object} 请求的原始request
    例：
    {
      protocol: 'http',
      url: 'http://anyproxy.io/',
      requestOptions: {
        hostname: 'anyproxy.io',
        port: 80,
        path: '/',
        method: 'GET',
        headers: {
          Host: 'anyproxy.io',
          'Proxy-Connection': 'keep-alive',
          'User-Agent': '...'
        }
      },
      requestData: '...',
      _req: {}
    }
  */
  // 发送请求前拦截处理
  // 如果beforeSendRequest返回了响应内容，则立即把此响应返回到客户端（而不再发送到真正的服务端），流程结束。
  *beforeSendRequest(requestDetail) {
     // const newRequestOptions = requestDetail.requestOptions;
     // 设置属性 rejectUnauthorized = true: 进行证书的强验证
      // newRequestOptions.rejectUnauthorized = false; //证书出错，不进行强制验证
      // return {
      //   requestOptions: newRequestOptions
      // };
    // 不做任何处理，返回null
      return null;
   },

  
  /*
    responseDetail
    requestDetail 同beforeSendRequest中的参数
    responseDetail
    response {object} 服务端的返回信息，包括statusCode header body三个字段
    _res {object} 原始的服务端返回对象
    举例，请求 anyproxy.io 时，responseDetail参数内容大致如下
    {
      response: {
        statusCode: 200,
        header: {
          'Content-Type': 'image/gif',
          Connection: 'close',
          'Cache-Control': '...'
        },
        body: '...'
      },
      _res: { }
    }
   */
  // 发送响应前处理
  *beforeSendResponse(requestDetail, responseDetail) {
    
    var request_host = requestDetail.requestOptions.hostname || "";
    var request_url = requestDetail.url || "";
    var request_method = requestDetail.requestOptions.method || "";
    var request_headers = requestDetail.requestOptions.headers || "";
    var request_data = requestDetail.requestData || "";

    var tmp_req_data = "";
    try {
      tmp_req_data = request_data.toString('utf-8')
    } catch (error) {
      console.log("Buffer to string error " , error)
    }

    var request_message = {
        ReqHost: request_host,
        ReqUrl: request_url,
        Method: request_method,
        Headers: request_headers,
        ReqBody: tmp_req_data,
    }
    CCWebSocket.brocast_message_to_client(request_message);
    console.log(CCWebSocket.get_cur_time() , "  " + requestDetail.protocol + "://" + request_host + " " , request_method)
    // if (tmp_req_data != "") {
    //   console.log("request_data>>", tmp_req_data)
    // }

    /*
    console.log("request---------------------start\n");
    console.log("hcc>>reqHost: " + request_host);
    console.log("hcc>>reqUrl: " + request_url);
    console.log("hcc>>method: " + request_method);
    console.log("hcc>>headers: ");
    console.log(request_headers);
    console.log("hcc>>requestData: ");
    console.log(request_data);
    console.log("request---------------------end\n");

    console.log("\nresponse---------------------start\n");
    var res_status_code = responseDetail.response.statusCode
    var res_headers = responseDetail.response.header
    var res_data_body = responseDetail.response.body
    var res_raw_body = responseDetail.response.rawBody

    console.log("hcc>>res_status_code: ")
    console.log(res_status_code)
    console.log("hcc>>resHeader: ")
    console.log(res_headers)
    console.log("hcc>>res_data_body: ")
    console.log(res_data_body)
    console.log("hcc>>res_raw_body: ")
    console.log(res_raw_body)
    console.log("\nresponse---------------------end\n");
    */
    /*
    var req_headers_str = ""
    for(let key in request_headers){
        req_headers_str = req_headers_str + key + ": " + request_headers[key] + "\n"
    }
    // data send to client 
    var request_message = "[reqHeader<" + request_host + ">]\n"
    request_message = request_message + "ReqUrl: " + request_url + "\n"
    request_message = request_message + "Method: " + request_method + "\n"
    request_message = request_message + req_headers_str
    */

    // 不做任何处理，返回null
    return null;
  },

  /*
    requestDetail
    host {string} 请求目标的Host，受制于协议，这里无法获取完整url
    _req {object} 请求的原始request
  */
  // 是否处理https请求
  // beforeDealHttpsRequest方法，如果返回true，会明文解析这个请求，其他请求不处理
  // 如果配置了全局解析https的参数，则AnyProxy会略过这个调用
  *beforeDealHttpsRequest(requestDetail) {
    return true
  },

  // 请求出错的事件
  *onError(requestDetail, error) {

  },
  // https连接服务器出错
  *onConnectError(requestDetail, error) {

  }
};