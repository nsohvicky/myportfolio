import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import EducationPage from "./pages/Education";
import ProjectPage from "./pages/Project";

// Navbar with links to 6 pages 
function Navbar() {
  const linkStyle = { marginRight: 12, color: "white", textDecoration: "none", fontWeight: 600 };
  return (
    <nav>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <strong style={{ color: "white", marginRight: 16 }}>Victorine’s Portfolio</strong>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/projects" style={linkStyle}>Projects</Link>
        <Link to="/education" style={linkStyle}>Education</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/signin" style={linkStyle}>Sign In</Link>
        <Link to="/signup" style={linkStyle}>Sign Up</Link>
      </div>
    </nav>
  );
}

// Home
function Home() {
  return (
    <div className="page">
      <h1>Welcome to Victorine's Portfolio</h1>
      <p>This site shows my work, education, and how to contact me.</p>
      <p>
        <Link to="/about">About Me</Link> | <Link to="/projects">Projects</Link>
      </p>
      <h3>Mission</h3>
      <p>Build useful, simple software and keep learning every day.</p>
    </div>
  );
}

//About page shows headshot + resume link
function About() {
  return (
    <div className="page">
      <h1>About Me</h1>
      <p>
        My name is <strong>Victorine Nsoh Enjowe</strong>. I am a student at Centennial College.
        I enjoy building clean, simple web apps and learning new tools.
      </p>

      
      <img src="/headshot.jpg" alt="My headshot" width="180" style={{ marginTop: 12 }} />

      
        <a href="/Resume.pdf" target="_blank" rel="noreferrer">Download My Resume (PDF)</a>
      
    </div>
  );
}


// App with Routes + footer
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <footer>© {new Date().getFullYear()} Victorine Nsoh Enjowe</footer>
    </div>
  );
}
