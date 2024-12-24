import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-extrabold">TaskManager</h1>
        <nav>
          <ul className="flex space-x-6">
            
           
            <li>
              <a href="/signup" className="hover:text-green-400 font-medium">
                Signup
              </a>
            </li>
            <li>
              <a href="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
