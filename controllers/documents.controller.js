const { getKnowledgeCollection, addKnowledge } = require("../infra/chroma/chroma.client");
const { randomUUID } = require("node:crypto");

async function createDocument(req, res) {
    const { documents } = req.body;

    console.log("req.body", documents)
    await addKnowledge(
        documents.map(() => randomUUID()),
        documents
    );
    return res.json({ message: "Success insert into database" })
}


async function updateDocument(req, res) {
    const { document, id } = req.body;

    const collection = await getKnowledgeCollection();
    collection.update({
        ids: [id],
        documents: [document]
    })
    
    return res.json({ message: "Success update database" })
}

module.exports={
    createDocument,
    updateDocument
}