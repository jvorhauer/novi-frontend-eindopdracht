import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import './Profile.css';
import './Notes.css';
import configuration from '../../config.json';

function Profile() {
  const [privateContent, setPrivateContent] = useState(null);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getPrivateContent() {
      try {
        const result = await axios.get(
          configuration.backend + '/api/notes',
          {
            headers: {
              "Accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrivateContent(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    if (token && user) {
      getPrivateContent();
    }
  }, [token, user]);

  return (
    <>
      <section>
        {user && (
          <>
            <h2>Mijn Gegevens</h2>
            <p>
              <strong>Gebruikersnaam:</strong> {user.username} ({user.id})
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </>
        )}
        {!user && (
          <>
            <h2>U bent niet aangemeld!</h2>
            <p>
              Deze pagina is alleen beschikbaar voor aangemelde gebruikers!
            </p>
            <p>
              Je kunt jezelf <Link to="/signin">aanmelden</Link> of{" "}
              <Link to="/signup">registeren</Link> als je nog geen account hebt.
            </p>
          </>
        )}
      </section>
      {user && privateContent && (
        <section>
          <h2>Mijn notities</h2>
          <table>
            <thead>
            <tr>
              <th scope="col">Titel</th>
              <th scope="col">Aangemaakt</th>
              <th scope="col">Laatst gewijzigd</th>
            </tr>
            </thead>
            <tbody>
            {
              privateContent.map((note) => (
                <tr key={note.id}>
                  <td><Link to={{pathname: `/view/${note.id}`}}>{note.title}</Link></td>
                  <td>{note.created}</td>
                  <td>{note.updated}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

export default Profile;
