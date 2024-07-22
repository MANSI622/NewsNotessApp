import React from 'react';
import image from "../assets/news.webp";
// import NewsNavbar from './NewsNavbar';

const NewsItem = ({ title, description, src, url }) => {
  return (
   <div>
<div className="max-w-xs bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg m-4">
        
        <div className="h-48 flex items-center justify-center overflow-hidden">
          <img src={src ? src : image} alt="news" className="h-full w-full object-cover" />
        </div>
        <div className="p-4">
          <h5 className="text-lg font-bold">{title.slice(0, 50)}</h5>
          <p className="text-gray-400">{description ? description.slice(0, 90) : "Custom description not provided"}</p>
          <a href={url} className="inline-block mt-2 text-blue-400 hover:text-blue-600">Read More</a>
        </div>
      </div>

   </div>
   
  );
}

export default NewsItem;
