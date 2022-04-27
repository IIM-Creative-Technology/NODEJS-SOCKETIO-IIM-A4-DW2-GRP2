const {DataTypes} = require("sequelize");
const sequelize = require("../models").sequelize;

const Document = require(`../models/document`)(sequelize, DataTypes);

class DocumentService{

    async createDocument(documentData) {
        const newDocument = Document.build({...documentData});
        return await newDocument.save();
    }
}

module.exports = DocumentService;