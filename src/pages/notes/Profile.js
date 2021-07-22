import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const [privateContent, setPrivateContent] = useState(null);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getPrivateContent() {
      try {
        const result = await axios.get(
          "https://sheltered-gorge-50410.herokuapp.com/api/notes",
          {
            headers: {
              "Content-Type": "application/json",
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
              <th>ID</th>
              <th>created</th>
              <th>updated</th>
              <th>title</th>
              <th>body</th>
            </tr>
            </thead>
            <tbody>
            {
              privateContent.map((note) => (
                <tr key={note.id}>
                  <td><Link to={{pathname: `/view/${note.id}`}}>{note.id}</Link></td>
                  <td>{note.created}</td>
                  <td>{note.updated}</td>
                  <td>{note.title}</td>
                  <td>{note.body}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
          <p>
            <Link to="/add">Nieuwe Notitie</Link>
          </p>
        </section>
      )}
      <p>
        Terug naar de <Link to="/">Homepagina</Link>
      </p>
    </>
  );
}

export default Profile;
