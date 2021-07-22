import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    status: "pending",
  });

  const history = useHistory();

  function isTokenValid(jwtToken) {
    const decodedToken = jwt_decode(jwtToken);
    const expirationUnix = decodedToken.exp;
    const now = new Date().getTime();
    const currentUnix = Math.round(now / 1000);
    return expirationUnix - currentUnix > 0;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!authState.user && token && isTokenValid(token)) {
      const decodedToken = jwt_decode(token);
      fetchUserData(token, decodedToken.sub);
    } else {
      setAuthState({
        user: null,
        status: "done",
      });
    }
  }, []);

  function login(jwtToken) {
    console.log("login", jwtToken);
    localStorage.setItem("token", jwtToken);
    const decodedToken = jwt_decode(jwtToken);
    console.log("decoded token", decodedToken);
    const userId = decodedToken.sub;

    fetchUserData(jwtToken, userId);
  }

  function logout() {
    const token = localStorage.getItem("token")
    if (token) {
      localStorage.removeItem("token")
      setAuthState({
        user: null,
        status: "done",
      });
    }
  }

  async function fetchUserData(token, id) {
    try {
      const result = await axios.get(
        `https://sheltered-gorge-50410.herokuapp.com/api/users/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setAuthState({
        user: {
          username: result.data.name,
          email: result.data.email,
          id: result.data.id,
        },
        status: "done",
      });
      history.push("/profile");
    } catch (e) {
      console.error(e);
    }
  }

  const data = {
    ...authState,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={data}>
      {authState.status === "pending" ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
