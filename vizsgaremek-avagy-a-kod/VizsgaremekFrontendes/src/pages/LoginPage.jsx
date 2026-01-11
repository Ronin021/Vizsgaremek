import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginApi } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginApi(email, password);
      login(response);
      navigate("/");
    } catch (err) {
      setError(err.message || "Bejelentkezés sikertelen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-auth">
      <div className="container auth-container">
        <div className="auth-card">
          <h1>Bejelentkezés</h1>
          <p className="auth-subtitle">
            Jelentkezz be a fiókodba vagy{" "}
            <Link to="/register" className="link-highlight">
              regisztrálj
            </Link>
            .
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            
            <label>
              E-mail cím
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Jelszó
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button 
              className="btn btn-black full-width" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Betöltés..." : "Bejelentkezés"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
