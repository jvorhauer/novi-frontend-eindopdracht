import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import makeUrl from '../../helpers/MakeUrl'
import makeHeaders from '../../helpers/MakeHeaders'
import './Profile.css';
import './Notes.css';

function Profile() {
  const [privateContent, setPrivateContent] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [error, setError] = useState("");
  const {user} = useContext(AuthContext);
  const {id, page} = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setError("");
    if (!user) {
      return;
    }
    const pageNr = page ? page : 0;
    const url = id ? makeUrl(`/api/notes/user/${id}?page=${pageNr}`) : makeUrl(`/api/users/timeline?page=${pageNr}`);
    const userId = id ? id : user.id;

    async function getPrivateContent() {
      try {
        const notes = await axios.get(url, makeHeaders(token));
        setPrivateContent(notes.data);

        const other = await axios.get(makeUrl(`/api/users/${userId}`), makeHeaders(token));
        setOtherUser(other.data);
      } catch (e) {
        console.error(e);
        setError(`Ophalen van notities is niet gelukt (${e})`);
        setPrivateContent(null);
      }
    }

    if (token && user) {
      getPrivateContent();
    }
  }, [token, user, id, page]);

  return (
    <>
      <section>
        {!error && otherUser && (
          <>
            <h2>Mijn Gegevens</h2>
            <p>
              <strong>Gebruikersnaam:</strong> {otherUser.username} ({otherUser.id})
            </p>
            <p>
              <strong>Email:</strong> {otherUser.email}
            </p>
          </>
        )}
        {!error && !user && (
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
        {error && (
          <>
            <h2 className="error">Oeps</h2>
            <p>
              Er is iets niet helemaal goed gegaan tijdens het ophalen van m'n notities
            </p>
            <p>
              (foutmelding: ${error})
            </p>
          </>
        )}
      </section>
      {user && otherUser && privateContent && (
        <section>
          <h2>Mijn {privateContent.totalElements} notities</h2>
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
              privateContent.content.map((note) => (
                <tr key={note.id}>
                  <td><Link to={{pathname: `/view/${note.id}`}}>{note.title}</Link></td>
                  <td>{note.created}</td>
                  <td>{note.updated}</td>
                </tr>
              ))
            }
            </tbody>
            <tfoot>
            <tr>
              <td><Link to={{pathname: `/profile/${otherUser.id}/${privateContent.number - 1}`}}>&lt;</Link></td>
              <td>Pagina {privateContent.number + 1} van {privateContent.totalPages}</td>
              <td><Link to={{pathname: `/profile/${otherUser.id}/${privateContent.number + 1}`}}>&gt;</Link></td>
            </tr>
            </tfoot>
          </table>
        </section>
      )}
    </>
  );
}

export default Profile;
