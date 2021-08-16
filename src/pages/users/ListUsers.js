import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import makeUrl from '../../helpers/MakeUrl'
import makeHeaders from '../../helpers/MakeHeaders'

function ListUsers() {
  const [privateContent, setPrivateContent] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUsers() {
      setError("");
      try {
        const result = await axios.get(makeUrl('/api/users'), makeHeaders(token));
        setPrivateContent(result.data);
      } catch (e) {
        console.error(e);
        setError(`Ophalen van gebruikers is niet gelukt (${e})`);
      }
    }
    if (token && user) {
      getUsers();
    }
  }, [token, user]);

  return (
    <>
      {error &&
        <section>
          <h2>Foutje</h2>
          <p>
            {error}
          </p>
        </section>
      }
      {user && !error && privateContent &&
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
            privateContent.content.map((usr) => (
              <tr key={usr.id}>
                <td><Link to={{pathname: `/profile/${usr.id}`}}>{usr.name}</Link></td>
                <td>{usr.email}</td>
                <td>{usr.joined}</td>
              </tr>
            ))
          }
          </tbody>
          <tfoot>
          <tr>
            <td>&lt;</td>
            <td>Pagina {privateContent.number + 1} van {privateContent.totalPages}</td>
            <td>&gt;</td>
          </tr>
          </tfoot>
        </table>
      </section>
      }
    </>
  )
}

export default ListUsers;
