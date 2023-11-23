// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/header';
import Blog from './pages/blog';
import Home from './pages/home';
import Room from './pages/rooms';
// import Register from './pages/register';

function App() {
  return (
    <Router>

      <div className="App">
        <Routes>
        	<Route path="/" element={<Home/>} />		
         	<Route path="/home" element={<Home/>} />		
         
          <Route path="/header" element={<Header/>} />		
          <Route path="/blog" element={<Blog/>} />		
          <Route path="/room" element={<Room/>} />    
         
          {/* Add other routes if needed */}
        </Routes>
       
      </div>
    </Router>
  );
}

export default App;
