import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import UploadForm from './UploadForm';
import FolderForm from './FolderForm';
import { createFolder, uploadFile } from "../api";

const Navbar = () => {
    const { pathname } = useLocation();
    const folderId = location.pathname.split('/')[2];
    const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
    const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);


    const handleUpload = async (file, description) => {
        try {
            const response = await uploadFile(folderId, file, description);
            console.log('File uploaded successfully:', response);
            alert('File uploaded successfully!');
          } catch (error) {
            console.error('Failed to upload file:', error);
            alert('Failed to upload file.');
          }
    };

    const handleCreateFolder = async (name, type, maxFileLimit) => {
        try {
            const res = await createFolder(name, type, maxFileLimit);
            console.log('Created folder:', res);
            alert('Folder created successfully');
        } catch (error) {
            console.error('Failed to create folder:', error);
            alert('Failed to create folder.');
        }
    };

    return (
        <>
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="text-2xl font-bold text-blue-600">Woogle Photos</div>
                <div className="space-x-4">
                    {
                        folderId ?  
                        <button 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setIsUploadFormOpen(true)}
                        >
                            Upload File
                        </button>
                        :
                        <button 
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() => setIsFolderFormOpen(true)}
                        >
                            New Folder
                        </button>
                    }
                </div>
            </nav>
            {isUploadFormOpen && (
                <UploadForm
                onClose={() => setIsUploadFormOpen(false)}
                onUpload={handleUpload}
                />
            )}
            {
                isFolderFormOpen && (
                <FolderForm
                    onClose={() => setIsFolderFormOpen(false)}
                    createFolder={handleCreateFolder}
                />
      )}
      </>
    );
  };
  
  export default Navbar;