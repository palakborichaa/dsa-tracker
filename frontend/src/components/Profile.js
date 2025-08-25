import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    problemName: '',
    platform: '',
    link: '',
    timeComplexity: '',
    spaceComplexity: ''
  });

  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    axios.get('http://localhost:5050/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data.user))
    .catch(() => navigate('/login'));
  }, [navigate]);

  // Fetch problems list
  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5050/api/dsa', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProblems(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5050/api/dsa/add', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ problemName: '', platform: '', link: '', timeComplexity: '', spaceComplexity: '' });
      fetchProblems();
    } catch (err) {
      console.error("Error submitting problem:", err.response?.data || err.message);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <Loading message="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
      </div>

      {/* User Information Card */}
      <div className="user-info-card">
        <div className="user-info-grid">
          <div className="info-item">
            <span className="info-label">Username</span>
            <span className="info-value">{user.username}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Problems Solved</span>
            <span className="info-value">{problems.length}</span>
          </div>
        </div>
      </div>

      {/* Add Problem Section */}
      <div className="add-problem-section">
        <h3>Add a DSA Problem</h3>
        <form onSubmit={handleSubmit} className="problem-form">
          <div className="form-group">
            <label htmlFor="problemName">Problem Name</label>
            <input
              id="problemName"
              name="problemName"
              placeholder="e.g., Two Sum"
              value={form.problemName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="platform">Platform</label>
            <input
              id="platform"
              name="platform"
              placeholder="e.g., LeetCode, HackerRank"
              value={form.platform}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="link">Problem Link</label>
            <input
              id="link"
              name="link"
              placeholder="https://leetcode.com/problems/..."
              value={form.link}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="timeComplexity">Time Complexity</label>
            <input
              id="timeComplexity"
              name="timeComplexity"
              placeholder="e.g., O(n), O(n²)"
              value={form.timeComplexity}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="spaceComplexity">Space Complexity</label>
            <input
              id="spaceComplexity"
              name="spaceComplexity"
              placeholder="e.g., O(1), O(n)"
              value={form.spaceComplexity}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary submit-btn">
            ➕ Add Problem
          </button>
        </form>
      </div>

      {/* Problems List Section */}
      <div className="problems-section">
        <h3>Your Solved Problems</h3>
        
        {loading ? (
          <Loading message="Loading problems..." />
        ) : problems.length > 0 ? (
          <div className="table-container">
            <table className="problems-table">
              <thead>
                <tr>
                  <th>Problem Name</th>
                  <th>Platform</th>
                  <th>Link</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Time Complexity</th>
                  <th>Space Complexity</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((p) => {
                  const created = new Date(p.createdAt);
                  const date = created.toLocaleDateString();
                  const time = created.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: true 
                  });

                  return (
                    <tr key={p._id}>
                      <td>
                        <strong>{p.problemName}</strong>
                      </td>
                      <td>
                        <span className="platform-badge">{p.platform}</span>
                      </td>
                      <td>
                        {p.link ? (
                          <a 
                            href={p.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="problem-link"
                          >
                            🔗 View
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                      <td>{date}</td>
                      <td>{time}</td>
                      <td>
                        {p.timeComplexity ? (
                          <span className="complexity-badge">{p.timeComplexity}</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                      <td>
                        {p.spaceComplexity ? (
                          <span className="complexity-badge">{p.spaceComplexity}</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No problems added yet.</p>
            <p>Start by adding your first DSA problem above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
