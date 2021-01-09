from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

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
class SimpleChat(WebSocket):

    def handleMessage(self):
       for client in clients:
          # if client != self:
         # client.sendMessage(self.address[0] + u' - ' + self.data)
         client.sendMessage("你发的是：" + self.data)
         print("recv: "+ self.data)

    def handleConnected(self):
       print(self.address, 'connected')
       # for client in clients:
       #    client.sendMessage(self.address[0] + u' - connected')
       clients.append(self)

    def handleClose(self):
       clients.remove(self)
       print(self.address, 'closed')
       # for client in clients:
       #    client.sendMessage(self.address[0] + u' - disconnected')

server = SimpleWebSocketServer('127.0.0.1', 8003, SimpleChat)
server.serveforever()