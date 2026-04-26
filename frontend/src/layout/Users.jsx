import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Users = () => {
    const[users,setUsers]=useState([]);
    const[editingUser, setEditingUser]=useState(null);//it shows table on false userId
    const[editedUser, setEditedUser]=useState({
      username:'',
      email:'',
    });  //User data & it shows form on true when data arrive it check username,email


    useEffect(()=>{
     const fetchApi=async()=>{
        try {
            const response= await axios.get("http://localhost:4000/api/admin/users")
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
     }
     fetchApi()
    },[]);

      // Handle delete user logic
    const handleDelete = async (userId) => {
      try {
        const responce = await axios.delete(`http://localhost:4000/api/admin/users/${userId}`);

        if (responce.status===200) {
        // Filter out the deleted user from the state
         const updatedUsers =  users.filter((user)=>user._id !== userId);
         setUsers(updatedUsers);
         alert("User deleted successfully")
         console.log("User deleted successfully");
        } else {
          alert('Failed to delete the user.');
        }
      } catch (error) {
        console.error('Error deleting user',error)
      }
    };
      // handleEdit button click
      const handleEdit = (user) => {
        setEditingUser(user._id);
        setEditedUser({
          username: user.username,
          email: user.email,
        });
      };

      // handle Input change for edited user
      const handleInputChange= (e) =>{
        const{name, value } = e.target;
        setEditedUser((prev)=>({
          ...prev,
          [name]: value,
        }));
      };

      const handleSaveEdit = async () => {
        try {
     const response = await axios.put(`http://localhost:4000/api/admin/users/${editingUser}`, editedUser);
          if (response.data.message === 'User updated') {
            // Update the state with the edited user
            const updatedUsers = users.map((user) =>
              user._id === editingUser ? { ...user, ...editedUser } : user
            );
            setUsers(updatedUsers);
            setEditingUser(null);
            setEditedUser({ username: '', email: '' });
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };
    


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Users Table</h2>

      {/* edit form */}
      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleSaveEdit}>
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
        {!editingUser && (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user._id}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user._id}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-1"
                onClick={()=>handleEdit(user)} // Trigger edit for this user
                >Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1"
                onClick={()=>handleDelete(user._id)} // Trigger delete for this user
                >
                Delete
                </button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    )}
    </div>
  );
}

export default Users;
