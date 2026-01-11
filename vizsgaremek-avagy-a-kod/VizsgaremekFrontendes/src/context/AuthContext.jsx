import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "../api/authApi.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* BEJELENTKEZÉS ÁLLAPOT LEKÉRÉSE INDULÁSKOR */
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      // TODO: token alapján user info lekérése
      setUser({ token });
    }
    setLoading(false);
  }, []);

  /* BEJELENTKEZÉS */
  function login(response) {
    // response tartalmaz: token, user { id, first_name, last_name, email }
    setToken(response.token);
    setIsLoggedIn(true);
    setUser(response.user);
  }

  /* KIJELENTKEZÉS */
  function logout() {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
