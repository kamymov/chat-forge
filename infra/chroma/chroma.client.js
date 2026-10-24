
const { ChromaClient } = require("chromadb");
const { EnvConfig } = require("../config/dotEnv");


const chroma = new ChromaClient({
    host: EnvConfig.ollamaHost,
    port: EnvConfig.ollamaPort
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