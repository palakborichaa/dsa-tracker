// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Navbar from './components/navbar';
<<<<<<< HEAD
import Background from './components/Background';
=======
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token on load
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
<<<<<<< HEAD
        <Background />
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
=======
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
      </div>
    </Router>
  );
}

export default App;
