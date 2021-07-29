import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ListUsers() {
  const [privateContent, setPrivateContent] = useState(null);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUsers() {
      try {
        const result = await axios.get(
          "https://sheltered-gorge-50410.herokuapp.com/api/users",
          {
            headers: {
              "Accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("users", result.data);
        setPrivateContent(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    if (token && user) {
      getUsers();
    }
  }, [token, user]);


  return (
    <>
      {user && privateContent &&
      <section>
        <h2>Gebruikers</h2>
        <table>
          <thead>
          <tr>
            <th>Naam</th>
            <th>Email</th>
            <th>Sinds</th>
          </tr>
          </thead>
          <tbody>
          {
            privateContent.map((usr) => (
              <tr key={usr.id}>
                <td><Link to={{pathname: `/profile/${usr.id}`}}>{usr.name}</Link></td>
                <td>{usr.email}</td>
                <td>{usr.joined}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </section>
      }
    </>
  )
}

export default ListUsers;
