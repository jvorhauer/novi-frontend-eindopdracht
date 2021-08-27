import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory } from "react-router-dom";
import makeUrl from '../helpers/MakeUrl';
import makeHeaders from '../helpers/MakeHeaders';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    status: "pending",
  });
  const [userState, setUserState] = useState(null);

  const history = useHistory();

  function isTokenValid(jwtToken) {
    if (!jwtToken) {
      return false;
    }
    const decodedToken = jwt_decode(jwtToken);
    const expirationUnix = decodedToken.exp;
    const now = new Date().getTime();
    const currentUnix = Math.round(now / 1000);
    return expirationUnix - currentUnix > 0;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!authState.user && isTokenValid(token)) {
      fetchUserData(token);
    } else {
      setAuthState({
        user: null,
        status: "done",
      });
    }
    // eslint-disable-next-line
  }, []);     // warning here: missing dependencies, which when included make the app completely unusable.

  function login(jwtToken) {
    console.log("login", jwtToken);
    if (isTokenValid(jwtToken)) {
      localStorage.setItem("token", jwtToken);
      fetchUserData(jwtToken);
    }
  }

  function logout() {
    const token = localStorage.getItem("token")
    if (token) {
      localStorage.removeItem("token")
    }
    setAuthState({
      user: null,
      status: "done",
    });
    console.log("status", authState.status);
  }

  function fetchUserData(token) {
    axios.get(makeUrl('/api/users/me'), makeHeaders(token))
      .then(result => {
        setAuthState({
          user: {
            username: result.data.name,
            email: result.data.email,
            id: result.data.id,
          },
          status: "done",
        });
        history.push("/profile");
      })
      .catch(e => console.error(e));
  }

  // TODO: replace useEffect with call to this routine?
  const getuser = () => {
    const token = localStorage.getItem("token")
    if (isTokenValid(token)) {
      axios.get(makeUrl('/api/users/me'), makeHeaders(token))
        .then(result => {
          console.log("getuser: result:", result);
          setUserState({
            username: result.data.name,
            email: result.data.email,
            id: result.data.id,
          })
        }).catch(error => {
          console.error(error);
          setUserState(null);
        })
    }
    return userState;
  }

  const data = {
    ...authState,
    login: login,
    logout: logout,
    getuser: getuser,
  };

  return (
    <AuthContext.Provider value={data}>
      {authState.status === "pending" ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
