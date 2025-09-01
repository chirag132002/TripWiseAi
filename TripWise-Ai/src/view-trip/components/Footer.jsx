import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">© {new Date().getFullYear()} Trip Planner. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a 
            href="https://github.com/chirag132002" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/chirag-dave-1b3458240/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
