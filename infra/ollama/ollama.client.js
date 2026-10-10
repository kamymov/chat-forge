const ollama = require("ollama");
const { EnvConfig } = require("../config/dotEnv");

async function chat(messages) {
    const response = await ollama.default.chat({
        model: EnvConfig.ollamaModel,
        messages
    });

    return response.message.content;
}

module.exports = {
    chat
}