
// import React from 'react';
// import { Link } from 'react-router-dom';
// const NewsNavbar = ({ setcategory }) => {
//   return (
//     <div className="bg-zinc-800">
//       <nav className="container mx-auto flex items-center justify-between p-4">
//         <a className="text-white text-2xl font-bold" href="#">
//           NewsMania
//         </a>
//         <div className="flex space-x-4">
//           <div className="text-white cursor-pointer" onClick={() => setcategory("technology")}>Technology</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("business")}>Business</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("health")}>Health</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("sports")}>Sports</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("entertainment")}>Entertainment</div>
//           <div className="mx-17 text-white cursor-pointer bg-zinc-500 px-3 py-1 rounded-md">

//           <Link 
//           to ='/signup'>
//         <button>Add Notes</button>
//         </Link>
//           </div>
         
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default NewsNavbar;


//testing 


// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// const NewsNavbar = ({ setcategory }) => {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsLoggedIn(true);
//             navigate('/dashboard');
//         }
//     },[]);

//     if (isLoggedIn) {
//         return null; // Prevents rendering the button if already redirected
//     }

//   return (
//     <div className="bg-zinc-800">
//       <nav className="container mx-auto flex items-center justify-between p-4">
//         <a className="text-white text-2xl font-bold" href="#">
//           NewsMania
//         </a>
//         <div className="flex space-x-4">
//           <div className="text-white cursor-pointer" onClick={() => setcategory("technology")}>Technology</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("business")}>Business</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("health")}>Health</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("sports")}>Sports</div>
//           <div className="text-white cursor-pointer" onClick={() => setcategory("entertainment")}>Entertainment</div>
//           <div className="mx-17 text-white cursor-pointer bg-zinc-500 px-3 py-1 rounded-md">

//           <Link 
//           to ='/signup'>
//         <button>Add Notes</button>
//         </Link>
//           </div>
         
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default NewsNavbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const NewsNavbar = ({ setcategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-800">
      <nav className="container mx-auto flex items-center justify-between p-4 flex-wrap">
        <a className="text-white text-2xl font-bold mr-7" href="#">
          NewsMania
        </a>
        <div className="block lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="lg:flex lg:flex-grow lg:items-center lg:space-x-4">
            <div className="block lg:inline-block mt-4 lg:mt-0 text-white cursor-pointer" onClick={() => setcategory("technology")}>Technology</div>
            <div className="block lg:inline-block mt-4 lg:mt-0 text-white cursor-pointer" onClick={() => setcategory("business")}>Business</div>
            <div className="block lg:inline-block mt-4 lg:mt-0 text-white cursor-pointer" onClick={() => setcategory("health")}>Health</div>
            <div className="block lg:inline-block mt-4 lg:mt-0 text-white cursor-pointer" onClick={() => setcategory("sports")}>Sports</div>
            <div className="block lg:inline-block mt-4 lg:mt-0 text-white cursor-pointer" onClick={() => setcategory("entertainment")}>Entertainment</div>
          </div>
          <div className="block mt-4 lg:inline-block lg:mt-0 text-white cursor-pointer bg-zinc-500 px-3 py-1 rounded-md mx-auto lg:mx-0">
            <Link to='/signup'>
              <button>Add Notes</button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NewsNavbar;
