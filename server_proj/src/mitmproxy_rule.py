# !/usr/bin/python3
# -*- coding: utf-8 -*-

from mitmproxy import http, ctx
import CCWebSocket

class MPController:

    def log(self, info) -> None:
        print(info)

    #请求
    # def request(self, flow: http.HTTPFlow) -> None:
    #     self.log(f"——METHOD——\n{flow.request.method}")
    #     self.log(f"——HOST——\n{flow.request.pretty_host}")
    #     self.log(f"——URL——\n{flow.request.pretty_url}")

    #返回
    def response(self, flow: http.HTTPFlow) -> None:
        # self.log(f"hcc>>HOST>> \n{flow.request.pretty_host}")
        # self.log(f"hcc>>method>> \n{flow.request.method}")
        # self.log(f"hcc>>URL>> \n{flow.request.pretty_url}")
        # self.log(f"hcc>>headers>> \n{str(flow.request.headers)}")
        # self.log("hcc>>response headers:>> start\n")
        # self.log(flow.response.headers)
        # self.log("\nhcc>>response headers:>> end")

        #请求url
        if flow.request.pretty_url:
            url_str_tmp = "[reqUrl<" + flow.request.pretty_host + ">]\n"
            url_str_tmp = url_str_tmp + "url: " +flow.request.pretty_url + "\n"
            url_str_tmp = url_str_tmp + "method: " + flow.request.method
            CCWebSocket.sendHttpMessage(url_str_tmp)

        #请求头
        if flow.request.headers:
            header_str_tmp = "[reqHeader<" + flow.request.pretty_host + ">]\n" + del_http_header(flow.request.headers)
            CCWebSocket.sendHttpMessage(header_str_tmp)

        #请求体
        if flow.request.content:
            CCWebSocket.sendHttpMessage("[reqBody<" + flow.request.pretty_host + ">]")
            CCWebSocket.sendHttpMessage(flow.request.content)

        if flow.response.headers:
            header_str_tmp = "[resHeader<" + flow.request.pretty_host + ">]\n" + del_http_header(flow.response.headers)
            CCWebSocket.sendHttpMessage(header_str_tmp)

        #返回体
        is_can_send_resbody = True
        if flow.response.headers:
            resp_header_items = flow.response.headers.items()
            for key, value in resp_header_items:
                if str(key).lower() == "content-type":
                    value_str = str(value)
                    if value_str.find("html") < 0 and value_str.find("image") < 0 and value_str.find("audio") < 0 and value_str.find("video") and value_str.find("javascript") < 0:
                        if flow.response.content:
                            CCWebSocket.sendHttpMessage("[resBody<" + flow.request.pretty_host + ">]")
                            CCWebSocket.sendHttpMessage(flow.response.content)
                            is_can_send_resbody = False
                    else:
                        is_can_send_resbody = False
                    break

        if is_can_send_resbody == True:
            if flow.response.content:
                CCWebSocket.sendHttpMessage("[resBody<" + flow.request.pretty_host + ">]")
                CCWebSocket.sendHttpMessage(flow.response.content)

addons = [
    MPController()
]

CCWebSocket.init()

#处理请求头
def del_http_header(head_tuple_obj):
    ret_key_value_str = ""
    for key ,value in head_tuple_obj.items():
        tmp_key_value = key + ": " + value + "\n"
        ret_key_value_str = ret_key_value_str + tmp_key_value
    return ret_key_value_str
