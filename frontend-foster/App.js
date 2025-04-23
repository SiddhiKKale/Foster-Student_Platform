import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [profile, setProfile] = useState({ name: '', email: '', enrollment: '' });
  const [books, setBooks] = useState(["Book 1", "Book 2", "Book 3", "Book 4"]);
  const [newBook, setNewBook] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile")
      .then(response => setProfile(response.data))
      .catch(error => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.post("http://localhost:5000/api/profile", profile)
      .then(response => alert("Profile saved!"))
      .catch(error => console.error("Error saving profile:", error));
  };

  const handleAddBook = () => {
    if (newBook.trim()) {
      setBooks(prevBooks => [...prevBooks, newBook]);
      setNewBook("");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", { email: loginEmail, password: loginPassword })
      .then(res => {
        alert("Login successful!");
        setShowLogin(false);
      })
      .catch(() => setLoginError("Invalid email or password"));
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Attractive Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="#">Foster</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={() => setShowLogin(!showLogin)}>Login</button>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Notes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Library</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogin && (
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow">
                <div className="card-body">
                  <h3 className="text-center text-primary mb-4">Login</h3>
                  {loginError && <div className="alert alert-danger">{loginError}</div>}
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body text-center">
                <h2 className="text-primary mb-3">Profile Info</h2>
                <img src="https://via.placeholder.com/100" alt="Avatar" className="rounded-circle mb-3" />
                <input className="form-control mb-2" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
                <input className="form-control mb-2" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
                <input className="form-control mb-2" name="enrollment" value={profile.enrollment} onChange={handleChange} placeholder="Enrollment Number" />
                <button className="btn btn-success mt-2" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="text-info mb-3">YouTube Video Section</h2>
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h2 className="text-success mb-3">Book Section</h2>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter book name"
                    value={newBook}
                    onChange={(e) => setNewBook(e.target.value)}
                  />
                  <button className="btn btn-outline-primary" onClick={handleAddBook}>Add Book</button>
                </div>

                <div className="row g-3">
                  {books.map((book, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="bg-white p-3 rounded shadow-sm text-center border border-secondary">
                        <h5>{book}</h5>
                        <p className="text-muted">Author: Unknown</p>
                        <button className="btn btn-sm btn-outline-info">Download</button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;