import React, { useState } from 'react';

const FolderForm = ({ onClose, createFolder }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [maxFileLimit, setMaxFileLimit] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Folder name is required.';
    }

    if (!type.trim()) {
      newErrors.type = 'File type is required.';
    } else {
      const allowedTypes = ['jpeg', 'jpg', 'png', 'gif', 'pdf', 'csv', 'ppt'];
      const types = type.split(',').map((t) => t.trim().toLowerCase());
      const invalidTypes = types.filter((t) => !allowedTypes.includes(t));

      if (invalidTypes.length > 0) {
        newErrors.type = `Invalid file types: ${invalidTypes.join(', ')}. Allowed types are: ${allowedTypes.join(', ')}.`;
      }
    }

    if (!maxFileLimit || isNaN(maxFileLimit)) {
      newErrors.maxFileLimit = 'Max file limit must be a valid number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        createFolder(name, type, parseInt(maxFileLimit, 10));
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Folder</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter folder name"
              className={`w-full p-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed File Types (comma-separated)
            </label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g., jpeg, png, pdf"
              className={`w-full p-2 border ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max File Limit
            </label>
            <input
              type="number"
              value={maxFileLimit}
              onChange={(e) => setMaxFileLimit(e.target.value)}
              placeholder="Enter max file limit"
              className={`w-full p-2 border ${
                errors.maxFileLimit ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.maxFileLimit && (
              <p className="text-red-500 text-sm mt-1">{errors.maxFileLimit}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderForm;