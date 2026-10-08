const express = require("express");
const bodyParser = require("body-parser");
const { chat } = require("./ollama");
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post("/", async (req, res) => {
    const message = req.body?.message;

    if (!message) {
        return res.json({
            error: "message is required"
        })
    }

    const chatResponse = await chat(message);

    res.json({ message: chatResponse });
})

app.listen(port, () => {
    console.log(`App is Listening on port: ${port}`);
});