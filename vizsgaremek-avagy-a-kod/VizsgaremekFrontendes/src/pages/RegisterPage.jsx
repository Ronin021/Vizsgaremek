import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register, login as apiLogin } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("A jelszavak nem egyeznek!");
      return;
    }

    setLoading(true);

    try {
      await register(firstName, lastName, email, password);
      const authResponse = await apiLogin(email, password);
      login(authResponse);
      navigate("/");
    } catch (err) {
      setError(err.message || "Regisztráció sikertelen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-auth">
      <div className="container auth-container">
        <div className="auth-card">
          <h1>Regisztráció</h1>
          <p className="auth-subtitle">
            Hozz létre egy fiókot vagy{" "}
            <Link to="/login" className="link-highlight">
              jelentkezz be
            </Link>
            .
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            
            <label>
              Keresztnév
              <input 
                type="text" 
                required 
                placeholder="Keresztnév"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Vezetéknév
              <input 
                type="text" 
                required 
                placeholder="Vezetéknév"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
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
            <label>
              Jelszó megerősítése
              <input 
                type="password" 
                required 
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </label>

            <button 
              className="btn btn-black full-width" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Betöltés..." : "Regisztráció"}
            </button>
          </form>

          <p className="auth-terms">
            A regisztrációval elfogadod az Általános Szerződési Feltételeket és
            az Adatvédelmi szabályzatot.
          </p>
        </div>
      </div>
    </div>
  );
}
