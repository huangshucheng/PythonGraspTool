# !/usr/bin/python3
# -*- coding: utf-8 -*-

from mitmproxy import http, ctx
from multiprocessing import Lock

# print(http)
# print(ctx)

class MPController:

    def log(self, info) -> None:
        print(info)


    # def request(self, flow: http.HTTPFlow) -> None:
    #     self.log(f"——METHOD——\n{flow.request.method}")
    #     self.log(f"——HOST——\n{flow.request.pretty_host}")
    #     self.log(f"——URL——\n{flow.request.pretty_url}")

    def response(self, flow: http.HTTPFlow) -> None:
        self.log(f"hcc>>HOST>> \n{flow.request.pretty_host}")
        self.log(f"hcc>>method>> \n{flow.request.method}")
        self.log(f"hcc>>URL>> \n{flow.request.pretty_url}")
        self.log(f"hcc>>headers>> \n{flow.request.headers}")
        self.log(f"hcc>>reqBody>> \n{flow.request.content.decode()}")
        self.log(f"hcc>>resBody>> \n{flow.response.content.decode()}")

addons = [
    MPController()
]