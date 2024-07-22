

import React from 'react'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import './index.css'
import NewsBoard from './components/NewsBoard'
import { useState } from 'react'
import NoPageFound from './components/NoPageFound/NoPageFound'
// const routes = (
  
//   <Router>
//   <Routes>
//   <Route path ='/dashboard' exact element ={<Home/>} />
//   <Route path ='/login' exact element ={<Login/>} />
//   <Route path ='/signup' exact element ={<SignUp/>} />
//   <Route path ='/' exact element={<NewsBoard category={category} />}></Route>
//   </Routes>
//   </Router>
// )
// function App() {
//   const [category ,setcategory] =useState("general")

//   return (
//     <div>
//         {routes}
     
//     </div>
//   )
// }

// export default App


function App() {
    const [category ,setcategory] =useState("general")
  
    return (
      <div>
         <Router>
  <Routes>
  <Route path ='/dashboard' exact element ={<Home/>} />
  <Route path ='/login' exact element ={<Login/>} />
   <Route path ='/signup' exact element ={<SignUp/>} />
   <Route path ='/' exact element={<NewsBoard category={category}  setcategory={setcategory}
   />}></Route>

      <Route path ='*' exact element ={<NoPageFound/>} />
   </Routes>
   </Router>
       
      </div>
    )
  }

  export default App