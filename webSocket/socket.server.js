const { Server } = require("socket.io");
const { MemoryCache } = require("../infra/cache/memory.cache");
const { messageHandler } = require("./handlers/message.handler");

class SocketServer {
    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        });
        this.cache = new MemoryCache();

        this.setup();
    }

    setup() {
        this.io.on("connection", async (socket) => {

            socket.emit("message", {
                message: "Hi i am a ai assist"
            });

            socket.on("message", (message) => messageHandler(socket, message?.message));

            socket.on("disconnect", () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    }
}

module.exports = {
    SocketServer
};