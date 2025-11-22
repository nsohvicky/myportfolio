import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      setSuccess("Account created successfully! Redirecting to sign in...");
      
      // Redirect to signin after 2 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Sign Up</h1>
      <p>Create a new account to manage your portfolio</p>

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

      <form onSubmit={onSubmit} style={{ maxWidth: 400 }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
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
        
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={onChange}
          required
          minLength="6"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={onChange}
          required
          minLength="6"
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        Already have an account? <Link to="/signin" style={{ color: "#007bff", textDecoration: "none" }}>Sign In</Link>
      </p>
    </div>
  );
}

export default Signup;
