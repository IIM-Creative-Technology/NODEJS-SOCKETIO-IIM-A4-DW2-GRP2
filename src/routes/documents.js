const DocumentService = require("../services/documentService");
const documentService = new DocumentService();

const router = require("express").Router();

router.post("/", (req, res) => {
    // #swagger.summary = 'Create a new document';
    // #swagger.tags = ['Documents']
    try {
        console.log(req.body)
        const result = documentService.createDocument(req.body);
        res.send(result);
    } catch (error) {
        res.status(400);
        res.send("An error occured while creating document");
    }
});

router.get("/:id", (req, res) => {
    // #swagger.summary = 'Get document by id'
    // #swagger.tags = ['Documents']
    res.send(req.params);
});

router.get("/", async (req, res) => {
    // #swagger.summary = 'Search users'
    // #swagger.tags = ['Users']
    try {
        res.send(await documentService.searchDocuments(req.query));
    } catch (error) {
        res.status(400);
        res.send({message: "An error occured while searching for documents"})
    }
});

router.delete("/:id", async (req, res) => {
    // #swagger.summary = 'Delete document by id'
    // #swagger.tags = ['Documents']
    /* #swagger.parameters['parameterName'] = {
          offset: <integer>,
          limit: <integer>,
          search: <string>,
    } */

    try {
        await documentService.deleteDocument(req.params.id)
        res.send()
    } catch (error) {
        res.status(400);
        res.send("An error occured when deleting document");
    }
});

module.exports = router;