const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
dotenv.config({ config: __dirname + ".env" });
const { EnvConfig } = require("./infra/config/dotEnv");
const { SocketServer } = require("./webSocket/socket.server");
const { chatPrivateRoutes } = require("./http/routes/routes");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/", chatPrivateRoutes);

const httpListen = app.listen(EnvConfig.port, () => {
    console.log(`App is Listening on port: ${EnvConfig.port}`);
});
new SocketServer(httpListen);