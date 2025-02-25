const { getAllFolderService, createFolderService, updateFolderService, deleteFolderService } = require("../services/folderServices");
const { folderValidation } = require("../validations/folderValidators");


/**
 * @swagger
 * /folders:
 *   get:
 *     description: Get a list of all folders
 *     responses:
 *       200:
 *         description: A list of folders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   maxFileLimit:
 *                     type: integer
 *       404:
 *         description: No folders found
 *       500:
 *         description: Internal server error
 */

const getAllFolders = async (req, res) => {
    try {
        const folders = await getAllFolderService();
        if(folders.length == 0){
            return res.status(404).json({error: "No folders found."});
        }

        res.status(200).json(folders);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."})
    }
}


/**
 * @swagger
 * /folder/create:
 *   post:
 *     description: Create a new folder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - maxFileLimit
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the folder
 *               type:
 *                 type: string
 *                 description: The type of the folder
 *               maxFileLimit:
 *                 type: integer
 *                 description: The max file limit for the folder
 *     responses:
 *       201:
 *         description: Folder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 folder:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     maxFileLimit:
 *                       type: integer
 *       400:
 *         description: Validation errors (Invalid data)
 *       500:
 *         description: Internal server error
 */
const createFolder = async (req, res) => {
    try {
        console.log("inside createFolder controller");
        console.log(req.body);
        const { name, type, maxFileLimit } = req.body;
        const errors = await folderValidation(name, type, maxFileLimit);
        console.log(errors);

        if(errors.length > 0){
            return res.status(400).json({errors});
        };

        const newFolder = await createFolderService(name, type, maxFileLimit);
        return res.status(201).json({message: 'Folder created successfully', folder:  newFolder});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."})
    }
};


const updateFolder = async (req, res) => {
    try {
        const { name, type, maxFileLimit } = req.body;
        const folderId = req.params.folderId;
        const errors = await folderValidation(name, type, maxFileLimit);

        if(errors.length > 0){
            return res.status(400).json({errors});
        };

        const updatedFolder = await updateFolderService(folderId, {name, type, maxFileLimit});
        if(!updatedFolder){
            return res.status(404).json({error: "Folder not found"});
        }
        return res.status(200).json({message: "Folder updated successfully", folder: updatedFolder});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error."})
    }
};


const deleteFolder = async (req, res) => {
    try {
        const folderId = req.params.folderId;
        const deletedFolder = await deleteFolderService(folderId);
        if(!deletedFolder){
            return res.status(404).json({error: "Folder not found"});
        }

        res.status(200).json({message: "Folder deleted successfully."})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."})
    }
}



module.exports = { getAllFolders, createFolder, updateFolder, deleteFolder };
