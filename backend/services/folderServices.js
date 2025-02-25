const { where } = require("sequelize");
const Folder = require("../models/folder");

const getAllFolderService = async () => {
    try {
        const folders = await Folder.findAll();
        return folders;
    } catch (error) {
        throw error;
    }
}

const createFolderService = async (name, type, maxFileLimit) => {
    try {
        const newFolder = await Folder.create({ name, type, maxFileLimit });
        return newFolder;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateFolderService = async  (folderId, folderDetails) => {
    try {
        const [updatedCount, updatedFolders] = await Folder.update(folderDetails, {
            where: { folderId },  
            returning: true,      
        });

        if (updatedCount === 0) {
            return null;
        }
        return updatedFolders[0]; 
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteFolderService = async (folderId) => {
    try {
        const deletedCount = await Folder.destroy({ where: { folderId } });
        if (deletedCount === 0) {
            return null;  
        }
        return  folderId; 
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getAllFolderService, createFolderService, updateFolderService, deleteFolderService};