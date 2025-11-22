import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/api/contacts";

function Contact() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const getToken = () => localStorage.getItem("jwtToken");

  // Fetch all contacts (READ)
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
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
      setError("You must be signed in to submit contacts");
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
        throw new Error(data.error || "Failed to save contact");
      }

      setSuccess(editingId ? "Contact updated successfully!" : "Contact created successfully!");
      setForm({ firstname: "", lastname: "", email: "" });
      setEditingId(null);
      fetchContacts(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to save contact");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE - Load contact into form
  const handleEdit = (contact) => {
    setForm({
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email
    });
    setEditingId(contact._id);
    setError("");
    setSuccess("");
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    const token = getToken();
    if (!token) {
      setError("You must be signed in to delete contacts");
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
        throw new Error(data.error || "Failed to delete contact");
      }

      setSuccess("Contact deleted successfully!");
      fetchContacts(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to delete contact");
    }
  };

  const cancelEdit = () => {
    setForm({ firstname: "", lastname: "", email: "" });
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="page">
      <h1>Contact Management</h1>

      <p>Manage your contact submissions</p>

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
      <form onSubmit={onSubmit} style={{ maxWidth: 520, marginBottom: 30 }}>
        <h3>{editingId ? "Edit Contact" : "Add New Contact"}</h3>
        
        <input
          name="firstname"
          placeholder="First Name"
          value={form.firstname}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <input
          name="lastname"
          placeholder="Last Name"
          value={form.lastname}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <div>
          <button type="submit" disabled={loading} style={{ marginRight: 10 }}>
            {loading ? "Saving..." : editingId ? "Update Contact" : "Add Contact"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} style={{ backgroundColor: "#6c757d" }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* READ - CONTACTS LIST */}
      <div>
        <h3>All Contacts ({contacts.length})</h3>
        {contacts.length === 0 ? (
          <p>No contacts yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>First Name</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Last Name</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Email</th>
                <th style={{ padding: 10, border: "1px solid #dee2e6" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{contact.firstname}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{contact.lastname}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>{contact.email}</td>
                  <td style={{ padding: 10, border: "1px solid #dee2e6" }}>
                    <button
                      onClick={() => handleEdit(contact)}
                      style={{ marginRight: 5, padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 3, cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
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

export default Contact;
