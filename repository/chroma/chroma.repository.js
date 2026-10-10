const { getKnowledgeCollection } = require("../../infra/chroma/chroma.client");

async function insert(data) {

}

async function update(data) {

}

async function remove() {

}

async function search(message) {
    const collection = await getKnowledgeCollection();

    const result = await collection.search({
        queryTexts: message,
        nResults: 5
    })

    return result.documents;
}

module.exports={
    insert,
    update,
    remove,
    search
}