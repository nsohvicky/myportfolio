import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/projects";

function Project() {
  const [form, setForm] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: ""
  });
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get JWT token from localStorage
  const getToken = () => localStorage.getItem("jwtToken");

  // Fetch all projects (READ)
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
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
      setError("You must be signed in to submit projects");
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
        throw new Error(data.error || "Failed to save project");
      }

      setSuccess(editingId ? "Project updated successfully!" : "Project created successfully!");
      setForm({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
      setEditingId(null);
      fetchProjects(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE - Load project into form
  const handleEdit = (project) => {
    setForm({
      title: project.title,
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      completion: project.completion ? project.completion.split('T')[0] : "",
      description: project.description
    });
    setEditingId(project._id);
    setError("");
    setSuccess("");
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    const token = getToken();
    if (!token) {
      setError("You must be signed in to delete projects");
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
        throw new Error(data.error || "Failed to delete project");
      }

      setSuccess("Project deleted successfully!");
      fetchProjects(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to delete project");
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
      <h1>Project Management</h1>

      <p>Manage your project portfolio</p>

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
        <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>
        
        <input
          name="title"
          placeholder="Project Title"
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
          placeholder="Project Description"
          value={form.description}
          onChange={onChange}
          required
          rows="4"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <div>
          <button type="submit" disabled={loading} style={{ marginRight: 10 }}>
            {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} style={{ backgroundColor: "#6c757d" }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* READ - PROJECT LIST */}
      <div>
        <h3>All Projects ({projects.length})</h3>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
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
              {projects.map((project) => (
                <tr key={project._id}>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{project.title}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    {project.firstname} {project.lastname}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{project.email}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    {new Date(project.completion).toLocaleDateString()}
                  </td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    {project.description.substring(0, 50)}...
                  </td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    <button
                      onClick={() => handleEdit(project)}
                      style={{ marginRight: 5, padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 3, cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
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

export default Project;
