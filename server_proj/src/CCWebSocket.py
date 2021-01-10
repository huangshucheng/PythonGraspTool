from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import threading

# class SimpleEcho(WebSocket):
#
#     def handleMessage(self):
#         # echo message back to client
#         self.sendMessage(self.data)
#
#     def handleConnected(self):
#         print(self.address, 'connected')
#
#     def handleClose(self):
#         print(self.address, 'closed')
#
# server = SimpleWebSocketServer('', 8000, SimpleEcho)
# server.serveforever()


clients = []
class WebSocketTool(WebSocket):
    def handleMessage(self):
        # print("hcc>>recv222: ", "clients: ", clients)
        for client in clients:
         client.sendMessage("echo data： " + self.data)
         # print("hcc>>recv111: ", self.data, "clients: " , clients)


    def handleConnected(self):
       print(self.address, 'connected')
       clients.append(self)

    def handleClose(self):
       clients.remove(self)
       print("hcc>>" , self.address, 'closed')


def _initCCWebSocket():
    server = SimpleWebSocketServer('127.0.0.1', 8003, WebSocketTool)
    server.serveforever()
    print("hcc>>init websocket success!!")


def init():
    # print("hcc>>init websocket thread..start")
    ccthread = threading.Thread(target=_initCCWebSocket)
    ccthread.start()
    # print("hcc>>init websocket thread..end")

def sendHttpMessage(data):
    # print("hcc>>sendHttpMessage>>>111", clients)
    for client in clients:
        client.sendMessage(data)
    # print("hcc>>sendHttpMessage>>>222", clients)

def testPrint():
    print("hcc>>test",clients)

# test
# if __name__ == '__main__':
#     ccthread = threading.Thread(target=_initCCWebSocket)
#     ccthread.start()