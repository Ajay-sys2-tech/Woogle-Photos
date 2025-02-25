const Sidebar = () => {
    return (
      <div className="w-64 bg-gray-100 p-4 border-r border-gray-200">
        <ul className="space-y-2">
          <li className="p-2 text-blue-600 hover:bg-gray-200 rounded cursor-pointer">My Drive</li>
          <li className="p-2 text-blue-600 hover:bg-gray-200 rounded cursor-pointer">Shared with me</li>
          <li className="p-2 text-blue-600 hover:bg-gray-200 rounded cursor-pointer">Recent</li>
          <li className="p-2 text-blue-600 hover:bg-gray-200 rounded cursor-pointer">Starred</li>
          <li className="p-2 text-blue-600 hover:bg-gray-200 rounded cursor-pointer">Trash</li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;