import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({ username: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/admin/users`, {
        headers: getAuthHeaders(),
      });
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users.');
      console.error('Fetch users error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${API}/api/admin/users/${userId}`, {
        headers: getAuthHeaders(),
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success('User deleted successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting user.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditedUser({ username: user.username, email: user.email });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${API}/api/admin/users/${editingUser}`, editedUser, {
        headers: getAuthHeaders(),
      });
      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser ? { ...u, ...editedUser } : u))
      );
      setEditingUser(null);
      setEditedUser({ username: '', email: '' });
      toast.success('User updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating user.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111111',
        color: '#f1f1f1',
        padding: '2rem',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#f59e0b', fontWeight: 700, margin: 0 }}>👥 User Management</h2>
        <p style={{ color: '#888', margin: '4px 0 0' }}>{users.length} registered users</p>
      </div>

      {/* Edit Form */}
      {editingUser && (
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(249,115,22,0.4)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h3 style={{ color: '#f97316', marginBottom: '1rem' }}>✏️ Edit User</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Username', name: 'username', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
            ].map((field) => (
              <div key={field.name}>
                <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '4px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={editedUser[field.name]}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={handleSaveEdit}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                color: '#111',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              💾 Save Changes
            </button>
            <button
              onClick={() => setEditingUser(null)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: '#aaa',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem',
            color: '#888',
            border: '2px dashed rgba(255,255,255,0.1)',
            borderRadius: '16px',
          }}
        >
          No users found.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ background: 'rgba(245,158,11,0.1)', borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
                {['#', 'Username', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      color: '#f59e0b',
                      fontWeight: 600,
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 16px', color: '#666', fontSize: '13px' }}>{index + 1}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '14px',
                          color: '#111',
                          flexShrink: 0,
                        }}
                      >
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: '#f1f1f1' }}>{user.username}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#aaa' }}>{user.email}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        background: user.role === 'admin'
                          ? 'rgba(245,158,11,0.15)'
                          : 'rgba(99,102,241,0.15)',
                        color: user.role === 'admin' ? '#f59e0b' : '#818cf8',
                        border: `1px solid ${user.role === 'admin' ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.3)'}`,
                        borderRadius: '20px',
                        padding: '3px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#666', fontSize: '13px' }}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(user)}
                        style={{
                          background: 'rgba(245,158,11,0.15)',
                          color: '#f59e0b',
                          border: '1px solid rgba(245,158,11,0.3)',
                          borderRadius: '6px',
                          padding: '6px 14px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        style={{
                          background: 'rgba(239,68,68,0.15)',
                          color: '#ef4444',
                          border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: '6px',
                          padding: '6px 14px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
