const { SYSTEM_PROMPT } = require("../../infra/constants/systemPrompts");
const { chat } = require("../../infra/ollama/ollama.client");
const { searchKnowledge } = require("../../repository/chroma/chroma.repository");


function emitMessage(socket, message, eventName = "message") {
    socket.emit(eventName, {
        message
    })
}

async function messageHandler(socket, message) {
    const embeddedMessages = await searchKnowledge(message);
    const messages = [
        {
            role: "system",
            content: SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: JSON.stringify({
                task: "answer_website_question",
                question: message,
            })
        },
        {
            role: "user",
            content: JSON.stringify({
                task: "untrusted_reference_data",
                question: embeddedMessages?.documents ?? []
            })
        }
    ];
    const messageResponse = await chat(messages);
    emitMessage(socket, messageResponse)
}



module.exports = {
    messageHandler,
    emitMessage
}


// const messages = [
//     {
//         role: "system",
//         content: SYSTEM_PROMPT,
//     },
//     {
//         role: "user",
//         content: JSON.stringify({
//             task: "answer_website_question",
//             question: message,
//         })
//     },
//     {
//         role: "user",
//         content: JSON.stringify({
//             task: "untrusted_reference_data",
//             question: embeddedMessages?.documents ?? []
//         })
//     }
// ];