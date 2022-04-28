const {DataTypes} = require("sequelize");
const {Op} = require("sequelize");
const sequelize = require("../models").sequelize;
const fs = require('fs');
const bcrypt = require("bcryptjs");
const Document = require(`../models/document`)(sequelize, DataTypes);

class DocumentService{

    async createDocument(documentData) {
        const newDocument = Document.build({...documentData});
        return await newDocument.save();
    }

    async searchDocuments({offset = 0, limit = 20, search = '', creatorId}) {
        const creatorIdQuery = creatorId ? {
            [Op.and]: {
                creatorId
            }
        } : undefined
        return await Document.findAndCountAll({
            where:
                {
                    [Op.or]: {
                        name: {
                            [Op.substring]: search
                        }
                    },
                    ...creatorIdQuery
                },
            offset,
            limit
        })
    }

    async getDocumentById(id){
        return await Document.findOne({
            where: {
                id
            }
        });
    }

    async updateDocument(document, patch){
        document.set({
            ...patch
        });

        return await document.save()
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