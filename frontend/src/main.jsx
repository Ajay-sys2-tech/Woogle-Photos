import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FolderList from './components/FolderList';
import FileList from './components/FileList';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
      <Routes>
        <Route path="/" element={<FolderList />} />
        <Route path="/folders/:folderId/files" element={<FileList />} />
      </Routes>
    </Router>
  </StrictMode>,
)
