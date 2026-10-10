const express = require("express");
const { createDocument } = require("../controllers/documents.controller");

const chatPrivateRoutes = express.Router();

chatPrivateRoutes.post("/documents", createDocument)

module.exports={
    chatPrivateRoutes
}