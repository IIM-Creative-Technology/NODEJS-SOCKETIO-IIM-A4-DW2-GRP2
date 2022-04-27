const DocumentService = require("../services/documentService");
const documentService = new DocumentService();

const router = require("express").Router();

router.post("/", (req, res) => {
    // #swagger.summary = 'Create a new document';
    // #swagger.tags = ['Documents']
    try {
        const result = documentService.createDocument(req.body);
        res.send(result);
    } catch (error) {
        res.status(400);
        res.send("An error occured while creating document");
    }

    router.get("/:id", (req, res) => {
        // #swagger.summary = 'Get document by id'
        // #swagger.tags = ['Documents']
        res.send(req.params);
    });
});