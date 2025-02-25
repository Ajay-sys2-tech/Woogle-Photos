
const FileItem = ({ name, type, size, url, description, onClick  }) => {
    // Check if the file type is an image
    if(!url){
        url = "https://cdni.iconscout.com/illustration/premium/thumb/not-found-illustration-download-in-svg-png-gif-file-formats--error-search-result-state-page-empty-states-pack-design-development-illustrations-3363936.png"
    }
    const isImage = /\.(jpeg|jpg|png|gif)$/i.test(name);
  
    // Remove the file extension from the name
    const fileNameWithoutExtension = name.replace(/\.[^/.]+$/, '');
  
    return (
      <div 
        className="flex flex-col items-center p-2 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
        >
        {isImage && url && (
          <div className="w-full h-48 overflow-hidden rounded-lg">
            <img
              src={url}
              alt={description || name} // Use description as alt text, fallback to name
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Display the name without extension */}
        <span className="mt-2 text-sm font-medium text-gray-800 text-center">
          {fileNameWithoutExtension}
        </span>
      </div>
    );
  };
  
export default FileItem;