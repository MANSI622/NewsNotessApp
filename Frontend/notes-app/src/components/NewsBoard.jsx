// import React, { useEffect, useState } from 'react'
// import NewsItem from './NewsItem';

// const NewsBoard = ({category}) => {

//     const [articles ,setArticles] =useState([]);
//     useEffect(() =>{
//         let url =`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`

//         fetch(url).then(response =>response.json())
//         .then(data=>setArticles(data.articles));

//     } ,[category])
//   return (
//     <div>
//         <h2 className='text-center'>Latest <span className='badge bg-danger'> News</span></h2>

//         {articles.map((news,index) =>{
//             return <NewsItem key={index} 
//             title={news.title}
//             description={news.description}
//             src={news.urlToImage}
//             url={news.url}
//             />
//         })}
//     </div>
//   )
// }

// export default NewsBoard


import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import NewsNavbar from './NewsNavbar';
import { Link } from 'react-router-dom';
const NewsBoard = ({ category ,setcategory }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setArticles(data.articles));
  }, [category]);

  return (
    <div>
        <NewsNavbar setcategory={setcategory}/>
      <h2 className="text-center text-2xl font-bold my-4">Latest <span className="text-red-600">News</span></h2>
      <div className="flex flex-wrap justify-center">
        {articles.map((news, index) => (
          <NewsItem 
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </div>
      <div>
       
        
      </div>
    </div>
  );
}

export default NewsBoard;




