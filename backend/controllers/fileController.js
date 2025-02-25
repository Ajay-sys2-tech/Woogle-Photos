const { 
    createFileService, 
    updateFileDescriptionService, 
    deleteFileService, 
    getFilesInFolderService,
    sortFilesService,
    getFilesByTypeService,
    getFilesMetadataService
 } = require("../services/fileService");

const createFile = async (req, res) => {
    try {
        console.log(req.files);
        const folderId = req.params.folderId;
        const file = req.files[0];
        const description = req.body.description;

        if(!file){
            return res.status(400).json({error: "No files found."});
        }

        const uploadedFile = await createFileService(folderId, file, description);
        res.status(201).json({message: "File uploaded successfully.", file: uploadedFile});
        
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }
}

const updateFileDescription = async (req, res) => {
    try {
        const { folderId, fileId } = req.params;
        const description = req.body.description;

        if(! description === '' ){
            return res.status(400).json({error: "Description is required."})
        }

        const updatedDescription = await updateFileDescriptionService(folderId, fileId, description);
        if(updatedDescription === null){
            return res.status(404).json({error: "File not found."});
        }

        res.status(200).json({message: 'File description updated successfully', files: updatedDescription});
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }
}

const deleteFile = async (req, res) => {
    try {
        const { folderId, fileId } = req.params;
        const deletedFile = await deleteFileService(folderId, fileId);

        if(deletedFile === 0){
            return res.status(404).json({error: "File not found."});
        }

        res.status(200).json({message: "File deleted successfully."})
    } catch (error) {
        res.status(500).json({error: "Internal server error."});
    }
}

const getFilesInFolder = async (req, res) => {
    try {
        const folderId = req.params.folderId;
        const files = await getFilesInFolderService(folderId);

        if(files.length === 0){
            return res.status(404).json({error: "No files found in the folder"});
        }

        res.status(200).json(files);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error."});
    }
};

const sortFiles = async (req, res) => {
    try {
        const folderId = req.params.folderId;
        const sortParam = req.query.sort;

        if(!sortParam || sortParam === ''){
            return res.status(400).json({error: "Sort param is required"});
        }

        const files = await sortFilesService(folderId, sortParam);
        if(files.length === 0){
            return res.status(404).json({error: "No files found."});
        }

        res.status(200).json(files);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error."});
    }
};

const getFilesByType = async (req, res) => {
    try {
        const fileType = req.query.type;
        if(!fileType || fileType === ''){
            return res.status(400).json({error: "File type is required"});
        }
        const files = await getFilesByTypeService(fileType);
        if(files.length === 0){
            return res.status(404).json({error: "No files found."});
        }
        res.status(200).json({files});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error."});
    }
}


const getFilesMetadata = async (req, res) => {
    try {
        const folderId = req.params.folderId;
        
        const files = await getFilesMetadataService(folderId);
        if(files.length === 0){
            return res.status(404).json({error: "No files found."});
        }
        res.status(200).json({files});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error."});
    }
}




module.exports = { 
    createFile,
    updateFileDescription,
    deleteFile,
    getFilesInFolder,
    sortFiles,
    getFilesByType,
    getFilesMetadata
}