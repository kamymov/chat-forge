const { getKnowledgeCollection } = require("../../infra/chroma/chroma.client");
const { embed } = require("../../infra/ollama/ollama.client");

async function addKnowledge(ids, documents) {
    const collection = await getKnowledgeCollection();
    const embeddings = await embed(documents);

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

module.exports={
    addKnowledge,
    searchKnowledge
}