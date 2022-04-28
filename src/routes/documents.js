const DocumentService = require("../services/documentService");
const documentService = new DocumentService();
const multer = require('multer');
const {authJwt} = require("../middleware");
const upload = multer({ dest :'uploads/'})
const router = require("express").Router();
const fs = require('fs');

router.post("/", [authJwt, upload.single('file')], async (req, res) => {
    // #swagger.summary = 'Create a new document';
    // #swagger.tags = ['Documents']
    try {
        if(!req?.file?.path){
            res.status(400).send({message: 'You must provide a file'});
        }

        const {originalname, path} = req.file;
        const result = await documentService.createDocument({
            ...req.body,
            name: originalname,
            uri: path,
            creatorId: req.user.id
        });
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

router.get("/", authJwt, async (req, res) => {
    // #swagger.summary = 'Search documents'
    // #swagger.tags = ['Users']
    /* #swagger.parameters['parameterName'] = {
         offset: <integer>,
         limit: <integer>,
         search: <string>,
         creatorId: <integer>
   } */
    try {
        if(req.query.creatorId && req.user.id !== req.query.creatorId && !req.user.isAdmin){
            res.status(403).send({message: 'Not authorized'})
        }

        res.send(await documentService.searchDocuments({...req.query, creatorId:
                !req.user.isAdmin && req.user.id !== req.query?.creatorId ? req.user.id : req.query?.creatorId}));
    } catch (error) {
        console.log(error)
        res.status(400);
        res.send({message: "An error occured while searching for documents"})
    }
});

router.get("/:id/download", authJwt, async (req, res) => {
    // #swagger.summary = 'Download document'
    // #swagger.tags = ['Users']

    const {user, params} = req;
    const document = await documentService.getDocumentById(params.id);

    if(document && fs.existsSync(document.uri)){
        if(document.creatorId !== user.id && !user.isAdmin){
            res.status(403).send({message:'Not authorized'})
            return
        }
        try {
            res.sendFile(document.uri, {root: './'});
        } catch (error) {
            res.status(400);
            res.send({message: "An error occured while fetching the document"})
        }

    }else{
        res.status(404).send({message: 'Document file not found'})
    }
});

router.patch("/", [authJwt, upload.single('file')], async (req, res) => {
    // #swagger.summary = 'Create a new document';
    // #swagger.tags = ['Documents']
    try {
        res.send("Updated");
    } catch (error) {
        res.status(400);
        res.send("An error occured while creating document");
    }
});

router.delete("/:id", authJwt, async (req, res) => {
    // #swagger.summary = 'Delete document by id'
    // #swagger.tags = ['Documents']

    try {
        const document = await documentService.getDocumentById(req.params.id);

        if(document){
            if(document.creatorId !== req.user.id && !req.user?.isAdmin){
                res.status(403).send({message: 'Not authorized'});
            }
            await documentService.deleteDocument(req.params.id);
            res.send()
        }else{
            res.status(404).send({message: 'Document not found'});
        }
    } catch (error) {
        res.status(400);
        res.send("An error occured when deleting document");
    }
});

module.exports = router;