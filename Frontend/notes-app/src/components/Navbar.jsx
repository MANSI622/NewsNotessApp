


import React, { useState } from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { GiHamburgerMenu } from 'react-icons/gi';

function Navbar({ userInfo, onSearchNote, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className='bg-white shadow-md'>
      <nav className='container mx-auto flex items-center justify-between p-4'>
        <h2 className='text-xl font-medium text-black'>Notes</h2>
        <SearchBar 
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearsearch={onClearSearch}
        />
        <div className='lg:hidden'>
          <button
            className='text-black focus:outline-none'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>
        <div className={`hidden lg:flex lg:items-center lg:space-x-4`}>
          <Link to="/">
            <button className="bg-zinc-800 text-white text-sm rounded-md px-4 py-2 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all duration-300">
               News App
            </button>
          </Link>
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      </nav>
      {isMenuOpen && (
        <div className='lg:hidden bg-white w-full'>
          <div className='flex flex-col items-center space-y-4 p-4'>
            <Link to="/">
              <button className="bg-zinc-800 text-white text-sm rounded-md px-4 py-2 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all duration-300">
                Go to News App
              </button>
            </Link>
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
