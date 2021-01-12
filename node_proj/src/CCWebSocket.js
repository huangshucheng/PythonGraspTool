const WebSocket = require('ws');
const os = require("os")

// console.log("hcc>> websocket Class: ", WebSocket)

function isLinux() {
    return os.platform() == "linux"
}

var web_socket_ip = isLinux() ? "121.41.0.245" : "127.0.0.1";
var web_socket_port = 8005;
var client_socket_list = {};

console.log("hcc>>web_socket_ip: ", web_socket_ip , " , port: " , web_socket_port);

function get_client_socket_key(client_socket) {
    if(!client_socket_list){
        return;
    }

    if (!client_socket._socket) {
        return;
    }
    var client_key = client_socket._socket.remoteAddress + ":" + client_socket._socket.remotePort;
    return client_key
}

function start_websocket_server() {
    var server_web_socket = new WebSocket.Server({
        host: web_socket_ip,
        port: web_socket_port
    });

    server_web_socket.on("connection", function (client_socket) {
       console.log("hcc>>client connection: ", client_socket._socket.remoteAddress + ":" + client_socket._socket.remotePort);
       var client_key = get_client_socket_key(client_socket)
       if (!client_key){
           console.error("hcc>>client socket key is null!!");
            return;
       }
        client_socket_list[client_key] = client_socket;
       ws_add_client_session_event(client_socket)
        console.log("hcc>>cur client count :", GetArrayLen(client_socket_list));
    });

    server_web_socket.on("listening", function () {
        console.log("hcc>>WebSocket server start listen", ",ip:", web_socket_ip, " ,port:", web_socket_port);
    });

    server_web_socket.on("error", function (err) {
        console.log("hcc>>WebSocket server listen error" , err);
    });

    server_web_socket.on("close", function (err) {
        console.log("hcc>>WebSocket server listen close!!", err);
    });
}

//send data to all client
function send_message_to_client(data_str) {
    for(let client_ley in client_socket_list){
        if (client_socket_list[client_ley].send) {
            client_socket_list[client_ley].send(data_str)
        }
    }
}

//websocket 客户端session事件
function ws_add_client_session_event(client_socket) {
    client_socket.on("close", function () {
        var client_key = get_client_socket_key(client_socket)
        if (client_key && client_socket_list[client_key]) {
            delete client_socket_list[client_key];
        }
        if (client_socket.close) {
            client_socket.close();
        }

        console.log("hcc>>client closed:", client_key, " ,cur client count: ", GetArrayLen(client_socket_list));
    });

    client_socket.on("error", function (err) {
    });

    client_socket.on("message", function (data) {
        if(data){
            client_socket.send(data);
            console.log("recv client message:");
            console.log(data);
        }
    });
}

//获取对象{},或者数组[],的长度
function GetArrayLen(array) {
    if (!array) {
        return 0;
    }
    let count = 0;
    for (const key in array) {
        count++;
    }
    return count;
}

var CCWebSocket = {
    start_websocket_server: start_websocket_server,
    send_message_to_client: send_message_to_client,
}

module.exports = CCWebSocket;
//test
// start_websocket_server();