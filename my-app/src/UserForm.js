import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:11003";

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch users on load
  useEffect(() => {
    fetchUsers();
  }, []);
  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL+"/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update User
        await axios.put(`${API_URL+""}/${editingId}`, formData);
      } else {
        // Add New User
        await axios.post(API_URL, formData);
      }
      setFormData({ name: "", email: "", age: "" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setFormData(user);
    setEditingId(user.id);
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>{editingId ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.age}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
