import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import EducationPage from "./pages/Education";
import ProjectPage from "./pages/Project";
import Content from "./pages/Content";



import "./App.css";

// Top navigation bar
function Navbar() {
  return (
    <header className="nav-wrapper">
      <div className="nav-bar">
        <div className="nav-brand">Victorine’s Portfolio</div>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/mission" className="nav-link">
            Mission
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/projects" className="nav-link">
            Projects
          </NavLink>
          <NavLink to="/education" className="nav-link">
            Education
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
          <NavLink to="/signin" className="nav-link">
            Sign In
          </NavLink>
          <NavLink to="/signup" className="nav-link nav-link-pill">
            Sign Up
          </NavLink>
          <NavLink to="/content" className="nav-link">
            Content
          </NavLink>

        </nav>
      </div>
    </header>
  );
}

// Home – only welcome message
function Home() {
  return (
    <main className="page">
      <section className="card">
        <h1 className="page-title">Welcome to Victorine&apos;s Portfolio</h1>
        <p className="page-text">
          This site showcases my projects, education, and how to contact me. It
          is a full-stack MERN portfolio created for COMP229 – Web Application
          Development.
        </p>
         {/* New CI/CD demo paragraph */}
        <Content />
      </section>
    </main>
  );
}

// Mission – separate page
function Mission() {
  return (
    <main className="page">
      <section className="card">
        <h1 className="page-title">Mission</h1>
        <p className="page-text">
          To build useful, simple software that makes people’s lives easier,
          while growing every day as a software engineer and problem solver.
        </p>
        <p className="page-text">
          I love clean design, clear code, and learning new tools that help me
          move from “idea” to “working prototype” quickly.
        </p>
      </section>
    </main>
  );
}

// About – description + resume
function About() {
  return (
    <main className="page">
      <section className="card card-flex">
        <div className="card-column">
          <h1 className="page-title">About Me</h1>
          <p className="page-text">
            My name is <strong>Victorine Nsoh Enjowe</strong>. I am a student at
            Centennial College, studying Software Engineering Technology – AI.
            I enjoy building clean, simple web applications and trying out new
            technologies.
          </p>
          <p className="page-text">
            This portfolio is part of my journey into full-stack development,
            using MongoDB, Express, React, and Node.js.
          </p>
          <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="btn">
            Download My Resume (PDF)
          </a>
        </div>
        <div className="card-column card-photo-column">
          {/* If the image is not set up yet, this still looks nice */}
          <div className="photo-placeholder">Photo</div>
          <p className="photo-caption">Future Software Engineer ✨</p>
        </div>
      </section>
    </main>
  );
}

// Main App
export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/content" element={<Content />} /> 

      </Routes>
      <footer className="footer">
        © {new Date().getFullYear()} Victorine Nsoh Enjowe
      </footer>
    </div>
  );
}
