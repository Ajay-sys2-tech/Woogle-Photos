const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { checkFolderCompatibility } = require("./middleware/folderCompatibility");
require("dotenv").config();
const swaggerDocs = require('./swagger');
const app = express();
const port = process.env.PORT;

const { getAllFolders, createFolder, updateFolder, deleteFolder } = require("./controllers/folderController");
const upload = require("./middleware/fileUpload");
const { 
    createFile, 
    updateFileDescription, 
    deleteFile,
    getFilesInFolder,
    sortFiles,
    getFilesByType,
    getFilesMetadata
 } = require("./controllers/fileController");

  
app.use(cors({origin: "https://woogle-photos.vercel.app", methods:  ['GET', 'POST', 'PUT', 'DELETE']}));
app.use(express.json());


const uploadDir = path.join(__dirname, "uploads");

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

app.use(cors());

app.use('src/uploads', express.static("src/uploads"))

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/folders", getAllFolders);
app.post("/folders/create", createFolder);
app.put("/folders/:folderId", updateFolder);
app.delete("/folders/:folderId", deleteFolder);

app.post(
    "/folders/:folderId/files", 
    function(req, res, next){
        upload(req, res, function(err) {
            if(err instanceof multer.MulterError){
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({error: 'File size exceeds the 10 MB limit'});
                }else if(err.code === 'UNEXPECTED_FILE_TYPE'){
                    return res.status(400).json({error: 'File type is not supported'});
                }
                else{
                    return res.status(500).json({error: 'An error occurred during file upload'});
                }
            }
            next();
        });
    }, 
    checkFolderCompatibility,
    createFile
);
app.put("/folders/:folderId/files/:fileId", updateFileDescription);
app.delete("/folders/:folderId/files/:fileId", deleteFile);

app.get("/folders/:folderId/files", getFilesInFolder);
app.get("/folders/:folderId/filesBySort", sortFiles);
app.get("/files", getFilesByType);
app.get("/folders/:folderId/files/metadata", getFilesMetadata);

swaggerDocs(app, port); 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})