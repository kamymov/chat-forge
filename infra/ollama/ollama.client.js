const ollama = require("ollama");
const { EnvConfig } = require("../config/dotEnv");

async function chat(messages) {
    const response = await ollama.default.chat({
        model: EnvConfig.ollamaModel,
        messages
    });

    return response.message.content;
}

async function embed(texts) {
    const response = await ollama.default.embed({
        model: EnvConfig.ollamaEmbeddingModel,
        input: texts,
    });

    return response.embeddings;
}


module.exports = {
    chat,
    embed
}