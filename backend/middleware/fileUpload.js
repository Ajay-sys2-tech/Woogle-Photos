const multer = require("multer");
const path = require("path");
const {fileTypeValidator} = require("../validations/fileTypeValidator");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'D:/Invact/Section-2.2/document-management-system/uploads')
    },

    filename: function (req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname));
    }
  })
  
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const isFileTypeAllowed = fileTypeValidator(file);
        if(isFileTypeAllowed){
            return cb(null, true);
        }
        else{
            cb(new multer.MulterError('UNEXPECTED_FILE_TYPE'))
        }
    }
}).array('file', 1);

module.exports =  upload;