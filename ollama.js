const ollama = require("ollama");

async function chat(message) {
    const response = await ollama.default.chat({
        model: "qwen3:1.7b",
        messages: [
            {
                role: "user",
                content: message
            }
        ]
    });

    return response.message.content;
}

module.exports = {
    chat
}