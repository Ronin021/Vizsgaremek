import { Link } from "react-router-dom";

export default function LoginPage() {
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

          <form className="auth-form">
            <label>
              E-mail cím
              <input type="email" required />
            </label>
            <label>
              Jelszó
              <input type="password" required />
            </label>

            <button className="btn btn-black full-width" type="submit">
              Bejelentkezés
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
