const { Server } = require("socket.io");
const { MemoryCache } = require("../infra/cache/memory.cache");
const { messageHandler, emitMessage } = require("./handlers/message.handler");
const { getChromaDbHealthCheck } = require("../infra/chroma/chroma.client");

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
            const healthCheck = await getChromaDbHealthCheck();
            if (!healthCheck) {
                console.error("Cannot Access to Chroma DB");
                emitMessage(socket, "در حال حاظر امکان ارتباط با دستیار وجود ندارد");
                socket.disconnect(true);
            }
            emitMessage(socket, "سلام. چطوری میتوانم کمکتان کنم؟")
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