const upload = require("../middleware/fileUpload");
const File = require("../models/file");
const { Op } = require("@sequelize/core");
const { cloudinaryUpload } = require("../utils/cloudinary");

const createFileService = async (folderId, file, description) => {
    try {
        const { originalname: name, mimetype:type, size } = file;
        const res = await cloudinaryUpload(file);
        console.log(res);
        const newFile = await File.create({folderId, name, description, type, size, url: res.secure_url});
        return newFile;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateFileDescriptionService = async (folderId, fileId, description) => {
    try {
        const [updateCount, updatedFile ] = await File.update({description}, {
            where: {folderId, fileId},
            returning: true
        });

        if(updateCount === 0){
            return null;
        }

        return {
            fileId: updatedFile[0].fileId,
            description: updatedFile[0].description,
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteFileService = async (folderId, fileId) => {
    try {
        const deletedFile = await File.destroy({ where: { folderId, fileId } });
        return deletedFile;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getFilesInFolderService = async (folderId) => {
    try {
        const files = await File.findAll({
            where: { folderId },
            attributes: ["fileId", "name", "description", "size", "uploadedAt", "url" ]
        });
        
        return files;
    } catch (error) {
        throw error;
    }
}

const sortFilesService = async(folderId, sortParam) => {
    try {
        const files = await File.findAll({
            where: {folderId},
            order: [[sortParam, 'ASC']],
            attributes: ["fileId", "name", "description", "size", "uploadedAt" ]
        });

        return files;
    } catch (error) {
        throw error;
    }
}

const getFilesByTypeService = async (fileType) => {
    try {
        const files = await File.findAll({
            where: {
                type: {[Op.like]: `%/${fileType}` }
            },
            
        });
        return files;
    } catch (error) {
        throw error;    
    }
};


const getFilesMetadataService = async (folderId) => {
    try {
        const files = await File.findAll({
            where: {folderId},
            attributes: ["fileId", "name", "size",  "description" ]
        })

        return files;
    } catch (error) {
        throw error;
    }
}
module.exports = { createFileService, updateFileDescriptionService, deleteFileService, getFilesInFolderService, sortFilesService, getFilesByTypeService, getFilesMetadataService}