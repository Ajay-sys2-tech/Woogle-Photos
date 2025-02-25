const Folder = require("../models/folder")
const File = require("../models/file")


const checkFolderCompatibility = async (req, res, next) => {
    try {
        let folderId = req.params.folderId;
        let file = req.files[0];

        const folderExists = await Folder.findOne({where: {folderId}});
        if (!folderExists) {
            return res.status(404).json({error: "Folder does not exist."});
        }
        console.log(file);
        const fileType = file.mimetype.split("/")[1];
        console.log(fileType, folderExists.type);
        if(folderExists.type !== fileType){
            return res.status(400).json({error: "File type is not allowed in the selected folder."});
        }

        const countOfFilesInFolder = await File.count({
            where:{folderId}
        })

        if(folderExists.maxFileLimit === countOfFilesInFolder){
            return res.status(400).json({error: "Maximum file limit reached in the selected folder."});
        }

        const fileNameExists = await File.findOne({where: {name: file.originalname, folderId}});

        if(fileNameExists){
            return res.status(400).json({error: "File with same name already exists, please choose a differnet name for your file."});
        }

        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { checkFolderCompatibility }