
const { ChromaClient } = require("chromadb");


const chroma = new ChromaClient({
    host: process.env.CHROMA_URL_HOST,
    port: process.env.CHROMA_PORT
});

async function getChromaDbHealthCheck() {
    try {
        await chroma.heartbeat();
        return true;
    } catch (err) {
        return false
    }
}

async function getKnowledgeCollection() {
    return chroma.getOrCreateCollection({
        name: "chatforge_knowledge",
        embeddingFunction: null,
        configuration: {
            hnsw: { space: "cosine" },
        },
    });
}



module.exports = {
    getKnowledgeCollection,
    getChromaDbHealthCheck
};