import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/education";

function Education() {
  const [form, setForm] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: ""
  });
  const [educations, setEducations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get JWT token from localStorage
  const getToken = () => localStorage.getItem("jwtToken");

  // Fetch all education records (READ)
  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEducations(data);
    } catch (err) {
      console.error("Error fetching education records:", err);
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = getToken();
    if (!token) {
      setError("You must be signed in to submit education records");
      setLoading(false);
      return;
    }

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;
      
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save education record");
      }

      setSuccess(editingId ? "Education updated successfully!" : "Education created successfully!");
      setForm({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
      setEditingId(null);
      fetchEducations(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to save education record");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE - Load education into form
  const handleEdit = (education) => {
    setForm({
      title: education.title,
      firstname: education.firstname,
      lastname: education.lastname,
      email: education.email,
      completion: education.completion ? education.completion.split('T')[0] : "",
      description: education.description
    });
    setEditingId(education._id);
    setError("");
    setSuccess("");
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education record?")) return;

    const token = getToken();
    if (!token) {
      setError("You must be signed in to delete education records");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete education record");
      }

      setSuccess("Education deleted successfully!");
      fetchEducations(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to delete education record");
    }
  };

  const cancelEdit = () => {
    setForm({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="page">
      <h1>Education Management</h1>

      <p>Manage your education records</p>

      {success && (
        <div style={{ padding: 10, marginBottom: 10, backgroundColor: "#d4edda", color: "#155724", borderRadius: 4 }}>
          {success}
        </div>
      )}

      {error && (
        <div style={{ padding: 10, marginBottom: 10, backgroundColor: "#f8d7da", color: "#721c24", borderRadius: 4 }}>
          {error}
        </div>
      )}

      {/* CREATE/UPDATE FORM */}
      <form onSubmit={onSubmit} style={{ maxWidth: 600, marginBottom: 30 }}>
        <h3>{editingId ? "Edit Education" : "Add New Education"}</h3>
        
        <input
          name="title"
          placeholder="Title (e.g., Bachelor of Science)"
          value={form.title}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={onChange}
            required
            style={{ flex: 1, padding: 8 }}
          />
          
          <input
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={onChange}
            required
            style={{ flex: 1, padding: 8 }}
          />
        </div>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <input
          type="date"
          name="completion"
          placeholder="Completion Date"
          value={form.completion}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={onChange}
          required
          rows="4"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <div>
          <button type="submit" disabled={loading} style={{ marginRight: 10 }}>
            {loading ? "Saving..." : editingId ? "Update Education" : "Add Education"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} style={{ backgroundColor: "#6c757d" }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* READ - EDUCATION LIST */}
      <div>
        <h3>All Education Records ({educations.length})</h3>
        {educations.length === 0 ? (
          <p>No education records yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Title</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Name</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Email</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Completion</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Description</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((education) => (
                <tr key={education._id}>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{education.title}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    {education.firstname} {education.lastname}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{education.email}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    {new Date(education.completion).toLocaleDateString()}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    {education.description.substring(0, 50)}...
                  </td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    <button
                      onClick={() => handleEdit(education)}
                      style={{ marginRight: 5, padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 3, cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(education._id)}
                      style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: 3, cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Education;
