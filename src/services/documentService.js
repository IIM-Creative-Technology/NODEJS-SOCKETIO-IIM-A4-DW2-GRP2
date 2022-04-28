const {DataTypes} = require("sequelize");
const {Op} = require("sequelize");
const sequelize = require("../models").sequelize;

const Document = require(`../models/document`)(sequelize, DataTypes);

class DocumentService{

    async createDocument(documentData) {
        const newDocument = Document.build({...documentData});
        return await newDocument.save();
    }

    async searchDocuments({offset = 0, limit = 20, search = ''}) {
        return await Document.findAndCountAll({
            where:
                {
                    [Op.or]: {
                        name: {
                            [Op.substring]: search
                        },
                        uri: {
                            [Op.substring]: search
                        },
                        creatorId: {
                            [Op.substring]: search
                        }
                    }
                },
            offset,
            limit
        })
    }

    async deleteDocument(id) {
        return await Document.destroy({
            where: {
                id: id
            },
        })
    }
}

module.exports = DocumentService;