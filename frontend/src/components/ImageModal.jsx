import React from 'react';

const ImageModal = ({ imageUrl, description, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full">
        {/* Image */}
        <img
          src={imageUrl}
          alt={description}
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        {/* Description */}
        <div className="p-4 bg-gray-100">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageModal;