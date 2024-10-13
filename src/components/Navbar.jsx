import React, { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-900 text-white py-2">
      <div className="flex justify-between items-center px-9">
        {/* Logo */}
        <div className="logo">
          <span className="font-bold text-xl">
            TaskDash 
            <span className="block md:inline"> By Adarsh</span>
          </span>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            className="focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Icon for hamburger */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation links (visible on md and above) */}
        <ul className="hidden md:flex gap-8">
          <li className="cursor-pointer hover:font-bold transition-all">Home</li>
          <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
        </ul>
      </div>

      {/* Mobile Menu - Visible only when hamburger is clicked */}
      {menuOpen && (
        <div className="px-9 md:hidden">
          <ul className="flex flex-col gap-4 top-5">
            <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
