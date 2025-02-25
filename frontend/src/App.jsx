import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FileList from './components/FileList';
import FolderList from './components/FolderList';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<FolderList />} />
            <Route path="/folders/:folderId/files" element={<FileList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;