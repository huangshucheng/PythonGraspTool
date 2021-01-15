const WebSocket = require('ws');
const os = require("os")

function isLinux() {
    return os.platform() == "linux"
}

//用内网ip
// var web_socket_ip = isLinux() ? "172.16.166.106" : "127.0.0.1";
var web_socket_port = 8005;
var server_web_socket = null;

console.log("hcc>>web_socket port: " , web_socket_port);

function get_client_socket_key(client_socket) {
    if (!client_socket) {
        return "";
    }

    if (!client_socket._socket) {
        return "";
    }
    var client_key = client_socket._socket.remoteAddress + ":" + client_socket._socket.remotePort;
    return client_key
}

function start_websocket_server() {
    server_web_socket = new WebSocket.Server({
        // host: web_socket_ip, //用默认
        port: web_socket_port,
        clientTracking: true, //保存客户端session，保存在wx.clients下
    });

    server_web_socket.on("connection", function (client_socket) {
        ws_add_client_session_event(client_socket)
        var client_key = get_client_socket_key(client_socket)
        console.log("hcc>>client connection: ", client_key, "  ,cur client count: ", server_web_socket.clients.size);
    });

    server_web_socket.on("listening", function () {
        console.log("hcc>>WebSocket server start listen at address: " , server_web_socket.address());
    });

    server_web_socket.on("error", function (err) {
        console.log("hcc>>WebSocket server listen error" , err);
    });

    server_web_socket.on("close", function (err) {
        console.log("hcc>>WebSocket server listen close!!", err);
    });

}

//send data to all client
function brocast_message_to_client(data) {
    if(!server_web_socket){
        return
    }
    for (const client of server_web_socket.clients) {
        try {
            var json_str = JSON.stringify(data);
            if(json_str){
                client.send(json_str);
                // console.log(json_str)
            }
        } catch (e) {
            console.error('websocket to send data error, ' + e);
        }
    }
}

//websocket 客户端session事件
function ws_add_client_session_event(client_socket) {
    client_socket.on("close", function () {
        if (client_socket.close) {
            client_socket.close();
        }
        var client_key = get_client_socket_key(client_socket)
        console.log("hcc>>client closed:", client_key, " ,cur client count: ", server_web_socket.clients.size);
    });

    client_socket.on("error", function (err) {
    });

    client_socket.on("message", function (data) {
        if(data){
            try {
                var json_str = JSON.stringify({
                    websocket_echo_data: data
                })
                if(json_str){
                    client_socket.send(json_str);
                    console.log("recv client message:", data);
                }
            } catch (error) {
                console.error('websocket failed to send echo data, ', error);
            }
        }
    });
}

// 获取当前时间(精确到毫秒)
function get_cur_time() {
    var now = new Date();
    var getFullYear     = now.getFullYear();
    var getMonth        = now.getMonth()+1;
    var getDate         = now.getDate();
    var getHours        = now.getHours();
    var getMinutes      = now.getMinutes();
    var getSeconds      = now.getSeconds();
    // var getMilliseconds = now.getMilliseconds();
    var timeStr = getFullYear + "/" + getMonth + "/" + getDate + " " + getHours + ":" + getMinutes + ":" + getSeconds;
    return timeStr
}

var CCWebSocket = {
    start_websocket_server: start_websocket_server,
    brocast_message_to_client: brocast_message_to_client,
    get_cur_time: get_cur_time,
}

module.exports = CCWebSocket;