import React, { useEffect, useState } from 'react';
import { getFolders } from '../api/';
import { Outlet, Link } from "react-router-dom";

const FolderList = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await getFolders();
        setFolders(data);
      } catch (error) {
        console.error('Failed to fetch folders:', error);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div className="space-y-2">
      {folders.map((folder) => (
        <div key={folder.folderId} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <Link to={`/folders/${folder.folderId}/files`} >
                {folder.name}
            </Link>
        </div>
      ))}
    </div>
  );
};

export default FolderList;