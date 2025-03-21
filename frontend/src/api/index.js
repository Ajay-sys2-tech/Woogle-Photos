import axios from 'axios';
// import dotenv from "dotenv";
// dotenv.config();
const apiUrl = import.meta.env.VITE_API_BASE_URL;


// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: apiUrl, // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});


// Fetch all folders
export const getFolders = async () => {
    try {
      const response = await api.get('/folders'); // Replace with your backend endpoint
      return response.data; // Assuming the response contains the folders data
    } catch (error) {
      throw error;
    }
};

export const getFilesByFolderId = async (folderId) => {
    try {
        const response = await api.get(`/folders/${folderId}/files`); 
        console.log(response.status);
        if(response.status === 404){
            return [];
        }
        return response.data; 
    } catch (error) {
        throw error;
    }
};

export const uploadFile = async (folderId, file, description) => {
    try {
        const formData = new FormData();
        formData.append('file', file); 
        formData.append('description', description); 

        
        const res = await api.post(`/folders/${folderId}/files`, formData, {
            // headers: {
            //     'Content-Type': 'multipart/form-data', 
            // },
        });

        return res.data;
    } catch (error) {
        throw error;
    }
};



export const createFolder = async (name, type, maxFileLimit) => {
    try {
        const formData = new FormData();
        formData.append('name', name); 
        formData.append('type', type); 
        formData.append('maxFileLimit', maxFileLimit); 

        
        const res = await api.post(`/folders/create`, formData, {
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        // if(!res.error)
        return res.data;
    } catch (error) {
        throw error;
    }
}

