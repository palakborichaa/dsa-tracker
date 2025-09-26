// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import './Profile.css';

function Profile() {
  const API_BASE = process.env.REACT_APP_API_URL; // Your deployed backend URL
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

  // Fetch profile and problems together
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileRes = await axios.get(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(profileRes.data.user);

        // Fetch user's DSA problems
        const problemsRes = await axios.get(`${API_BASE}/dsa`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProblems(problemsRes.data);

      } catch (err) {
        console.error(err);
        navigate('/login'); // Redirect to login if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, API_BASE]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new DSA problem
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(`${API_BASE}/dsa/add`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({
        problemName: '',
        platform: '',
        link: '',
        timeComplexity: '',
        spaceComplexity: ''
      });
      
      // Refresh problems list
      const problemsRes = await axios.get(`${API_BASE}/dsa`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProblems(problemsRes.data);

    } catch (err) {
      console.error("Error submitting problem:", err.response?.data || err.message);
    }
  };

  if (loading) return <Loading message="Loading profile..." />;

  if (!user) return null; // Just in case

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
      </div>

      {/* User Info Card */}
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

      {/* Add Problem Form */}
      <div className="add-problem-section">
        <h3>Add a DSA Problem</h3>
        <form onSubmit={handleSubmit} className="problem-form">
          {['problemName', 'platform', 'link', 'timeComplexity', 'spaceComplexity'].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field === 'problemName' ? 'Problem Name' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                id={field}
                name={field}
                placeholder={field === 'problemName' ? 'e.g., Two Sum' : ''}
                value={form[field]}
                onChange={handleChange}
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary submit-btn">
            ➕ Add Problem
          </button>
        </form>
      </div>

      {/* Problems List */}
      <div className="problems-section">
        <h3>Your Solved Problems</h3>
        {problems.length > 0 ? (
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
                  const time = created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                  return (
                    <tr key={p._id}>
                      <td><strong>{p.problemName}</strong></td>
                      <td><span className="platform-badge">{p.platform}</span></td>
                      <td>
                        {p.link ? (
                          <a href={p.link} target="_blank" rel="noreferrer" className="problem-link">
                            🔗 View
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                      <td>{date}</td>
                      <td>{time}</td>
                      <td>{p.timeComplexity || '—'}</td>
                      <td>{p.spaceComplexity || '—'}</td>
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
