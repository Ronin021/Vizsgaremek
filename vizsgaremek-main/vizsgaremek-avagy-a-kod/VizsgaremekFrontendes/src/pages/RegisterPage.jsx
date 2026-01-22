import { Link } from "react-router-dom";

export default function RegisterPage() {
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

          <form className="auth-form">
            <label>
              Teljes név
              <input type="text" required />
            </label>
            <label>
              E-mail cím
              <input type="email" required />
            </label>
            <label>
              Jelszó
              <input type="password" required />
            </label>
            <label>
              Jelszó megerősítése
              <input type="password" required />
            </label>

            <button className="btn btn-black full-width" type="submit">
              Regisztráció
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
