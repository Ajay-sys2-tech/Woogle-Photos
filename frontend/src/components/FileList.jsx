import { useEffect, useState } from 'react';
import { getFilesByFolderId } from '../api/';
import { useParams } from "react-router-dom";
import FileItem from './FileItem';
import ImageModal from './ImageModal';

// const FileItem = ({ name, type, size, url, description }) => {
//     // Check if the file type is an image
//     if(!url){
//         url = "https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--error-search-result-state-page-empty-states-pack-design-development-illustrations-3363936.png"
//     }
//     const isImage = /\.(jpeg|jpg|png|gif)$/i.test(name);
  
//     // Remove the file extension from the name
//     const fileNameWithoutExtension = name.replace(/\.[^/.]+$/, '');
  
//     return (
//       <div className="flex flex-col items-center p-2 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
//         {/* Display image if the file is an image */}
//         {isImage && url && (
//           <div className="w-full h-48 overflow-hidden rounded-lg">
//             <img
//               src={url}
//               alt={description || name} // Use description as alt text, fallback to name
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}
//         {/* Display the name without extension */}
//         <span className="mt-2 text-sm font-medium text-gray-800 text-center">
//           {fileNameWithoutExtension}
//         </span>
//       </div>
//     );
//   };
  

  
 

const FileList = () => {
    const { folderId } = useParams();
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (file) => {
      if (file.url) {
        setSelectedImage(file);
      }
    };
  
    const handleCloseModal = () => {
      setSelectedImage(null);
    };
  

  
    useEffect(() => {
      const fetchFiles = async () => {
        try {
          const data = await getFilesByFolderId(folderId);
          setFiles(data);
          console.log(data);
        } catch (error) {
          console.error('Failed to fetch files:', error);
        }
      };
  
      if (folderId) {
         fetchFiles();
      }
    }, [folderId]);
  
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {files.map((file) => (
                <FileItem
                key={file.id}
                name={file.name}
                type={file.type}
                size={file.size}
                url={file.url} // Pass the image URL
                description={file.description} // Pass the description
                onClick={() => handleImageClick(file)}
                />
            ))}
            </div>
            {selectedImage && (
                <ImageModal
                imageUrl={selectedImage.url}
                description={selectedImage.description}
                onClose={handleCloseModal}
                />
            )}
      </>
    );
  };
  
  export default FileList;