import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-content">
<<<<<<< HEAD
        <h1 className="hero-title">
=======
        <h1 className="hero-title floating">
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
          Master DSA Problems
        </h1>
        <p className="hero-subtitle">
          Track your progress, analyze your solutions, and become a better problem solver. 
          Join thousands of developers who are improving their algorithmic skills.
        </p>
        
        {!isLoggedIn && (
          <div className="button-group">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/signup')}
            >
<<<<<<< HEAD
              Get Started
=======
              🚀 Get Started
            </button>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/login')}
            >
              🔐 Sign In
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
            </button>
          </div>
        )}
      </div>

<<<<<<< HEAD
              <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3 className="feature-title">Track Progress</h3>
            <p className="feature-description">
              Monitor your problem-solving journey with detailed analytics and progress tracking.
            </p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3 className="feature-title">Analyze Solutions</h3>
            <p className="feature-description">
              Record time and space complexity for each solution to understand your approach better.
            </p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3 className="feature-title">Multiple Platforms</h3>
            <p className="feature-description">
              Track problems from LeetCode, HackerRank, CodeForces, and other coding platforms.
            </p>
          </div>
        </div>


=======
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">📊</span>
          <h3 className="feature-title">Track Progress</h3>
          <p className="feature-description">
            Monitor your problem-solving journey with detailed analytics and progress tracking.
          </p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3 className="feature-title">Analyze Solutions</h3>
          <p className="feature-description">
            Record time and space complexity for each solution to understand your approach better.
          </p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3 className="feature-title">Multiple Platforms</h3>
          <p className="feature-description">
            Track problems from LeetCode, HackerRank, CodeForces, and other coding platforms.
          </p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">10K+</span>
          <span className="stat-label">Problems Solved</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5K+</span>
          <span className="stat-label">Active Users</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Topics Covered</span>
        </div>
      </div>
>>>>>>> 376bd36c7d51a3edb60d03323b2d24290b236428
    </div>
  );
}

export default Home;
