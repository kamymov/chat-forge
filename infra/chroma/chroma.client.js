
const { ChromaClient } = require("chromadb");
const ollama = require("ollama");

const chroma = new ChromaClient({
    path: process.env.CHROMA_URL || "http://localhost:8000",
});

const EMBEDDING_MODEL =
    process.env.OLLAMA_EMBEDDING_MODEL || "all-minilm";

async function embed(texts) {
    const response = await ollama.default.embed({
        model: EMBEDDING_MODEL,
        input: texts,
    });

    return response.embeddings;
}

async function getKnowledgeCollection() {
    return chroma.getOrCreateCollection({
        name: "chatforge_knowledge",
        configuration: {
            hnsw: { space: "cosine" },
        },
    });
}

async function addKnowledge(ids, documents) {
    const collection = await getKnowledgeCollection();
    console.log("documents", documents)
    const embeddings = await embed(documents);

    console.log("embedding", embeddings)

    await collection.upsert({
        ids,
        documents,
        embeddings,
    });
}

async function searchKnowledge(question, limit = 5) {
    const collection = await getKnowledgeCollection();
    const [queryEmbedding] = await embed([question]);

    return collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: limit,
    });
}

module.exports = {
    getKnowledgeCollection,
    addKnowledge,
    searchKnowledge,
};