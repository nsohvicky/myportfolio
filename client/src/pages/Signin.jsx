import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken } from "../utils/auth";

function Signin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      // Save token to localStorage
      saveToken(data.token);
      
      console.log("Signed in successfully:", data.user);
      
      // Redirect to contact page
      navigate("/contact");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Sign In</h1>
      <p>Sign in to manage contacts</p>

      {error && (
        <div style={{ padding: 10, marginBottom: 10, backgroundColor: "#f8d7da", color: "#721c24", borderRadius: 4 }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ maxWidth: 400 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={onChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p style={{ marginTop: 20 }}>
        Don't have an account? <Link to="/signup" style={{ color: "#007bff", textDecoration: "none" }}>Sign Up</Link>
      </p>

      <p style={{ marginTop: 10, fontSize: "0.9em", color: "#666" }}>
        Test credentials: admin@gmail.com / 123456789
      </p>
    </div>
  );
}

export default Signin;
