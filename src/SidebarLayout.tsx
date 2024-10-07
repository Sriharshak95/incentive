import React, { useState } from 'react';

const ResponsiveGrid = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Toggle Sidebar Button - visible only on mobile */}
      <div className="md:hidden p-2">
        <button
          onClick={toggleSidebar}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] h-full transition-all duration-300 ease-in-out">
        {/* Sidebar */}
        
        <div
          className={`sidebar bg-gray-300 p-4 md:block ${
            isSidebarOpen ? 'block' : 'hidden'
          } md:h-auto md:relative fixed top-0 left-0 h-full w-full md:w-auto z-40`}
        >

        <button
          onClick={toggleSidebar}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
          <h2 className="text-xl font-bold">Sidebar</h2>
          <p>This is the sidebar content.</p>
        </div>

        {/* Main Content */}
        <div className="main-content bg-gray-200 p-4">
          <h1 className="text-xl font-bold">Main Content</h1>
          <p>This is the main content of the page.</p>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveGrid;
