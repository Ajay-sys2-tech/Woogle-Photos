const Folder = require("../models/folder")

const folderValidation = async ( name, type, maxLimit ) => {
    try {
        let errors = [];
        let validFileTypes = ['csv', 'pdf', 'ppt', 'jpg', 'jpeg'];
        if(!name || name === ''){
            errors.push('Name is required');
            return errors;
        }

        if(!type || !validFileTypes.includes(type) ){
            errors.push('Invalid file type');
            return errors;
        }

        if(!maxLimit || isNaN(maxLimit) || maxLimit <= 0){
            console.log(isNaN(maxLimit) );
            errors.push('Invalid max limit');
            return errors;
        }

        const folderExists = await Folder.findOne({where: {name}});
        console.log(folderExists);

        if(folderExists){
            errors.push("Folder already exists, please create a folder with different name");
            return errors;
        }

        return errors;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = { folderValidation };