import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import makeUrl from '../../helpers/MakeUrl'
import makeHeaders from '../../helpers/MakeHeaders'
import './Profile.css';
import './Notes.css';

function Profile() {
  const [privateContent, setPrivateContent] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const { id, page } = useParams();
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    function getPrivateContent() {
      const pageNr = page ? page : 0;
      const urlparams = `page=${pageNr}&size=12`
      const url = id ? makeUrl(`/api/notes/user/${id}?${urlparams}`) : makeUrl(`/api/users/timeline?${urlparams}`);
      const userId = id ? id : user.id;

      setError("");
      axios.get(url, makeHeaders(token))
        .then(notes =>
          setPrivateContent(notes.data))
        .catch(error => {
          console.error(error);
          setError(`Ophalen van notities is niet gelukt (${error})`);
          setPrivateContent(null);
        });

      axios.get(makeUrl(`/api/users/${userId}`), makeHeaders(token))
        .then(other =>
          setOtherUser(other.data))
        .catch(error => {
          console.error(error);
          setError(`Ophalen van gebruikersgegevens is niet gelukt (${error})`);
        });
    }

    if (token && user) {
      getPrivateContent();
    }
  }, [token, user, id, page]);

  function makePrevLink(userId, isFirst) {
    if (isFirst) {
      return <span className="link-disabled" title="Er is geen vorige pagina">Vorige</span>
    } else {
      return <Link to={`/profile/${userId}/${privateContent.number - 1}`}>Vorige</Link>
    }
  }

  function makeNextLink(userId, isLast) {
    if (isLast) {
      return <span className="link-disabled" title="Er is geen volgende pagina">Volgende</span>
    } else {
      return <Link to={`/profile/${userId}/${privateContent.number + 1}`}>Vorige</Link>
    }
  }

  function gotoNote(id) {
    history.push(`/view/${id}/view`);
  }

  return (
    <div className="content content-left">
      {!error && otherUser && privateContent && (
        <>
          <article className="note-card">
            <h3><i className="fas fa-arrow-left"></i></h3>
            <dl>
              <dt>Ga naar</dt>
              <dd>
                <Link to={`/profile/${otherUser.id}`}>Eerste</Link> of<br />
                {makePrevLink(otherUser.id, privateContent.first)}
              </dd>
              <dt>Pagina</dt>
              <dd>Nu op {privateContent.number + 1} van {privateContent.totalPages}</dd>
            </dl>
          </article>
          <article className="note-card user">
            <h3><i className="fas fa-user"></i></h3>
            <dl>
              <dt>Gebruiker</dt>
              <dd>{otherUser.name} {otherUser.id === user.id ? " (zelf)" : ""}</dd>
              <dt>Sinds</dt>
              <dd>{otherUser.joined}</dd>
              <dt>Email adres</dt>
              <dd>{otherUser.email}</dd>
              <dt>Aantal notities</dt>
              <dd>{otherUser.noteCount}</dd>
            </dl>
          </article>
        </>
      )}
      {!error && !user && (
        <article className="note-error-card">
          <h2>U bent niet aangemeld!</h2>
          <p>
            Deze pagina is alleen beschikbaar voor aangemelde gebruikers!
          </p>
          <p>
            Je kunt jezelf <Link to="/signin">aanmelden</Link> of{" "}
            <Link to="/signup">registeren</Link> als je nog geen account hebt.
          </p>
        </article>
      )}
      {error && (
        <article className="note-error-card">
          <h2 className="error">Oeps</h2>
          <p>
            Er is iets niet helemaal goed gegaan tijdens het ophalen van gegevens
          </p>
          <p>
            (foutmelding: ${error})
          </p>
        </article>
      )}
      {user && otherUser && privateContent && (
        <>
          {
            privateContent.content.map((note) => (
              <article className="note-card touchy" key={note.id} onClick={() => gotoNote(note.id)}>
                <h3><i className="far fa-file-alt"></i>&nbsp;{note.title}</h3>
                <dl>
                  <dt>auteur</dt>
                  <dd>{note.username}</dd>
                  <dt>gecreerd</dt>
                  <dd>{note.created}</dd>
                  <dt>laatst gewijzigd</dt>
                  <dd>{note.updated}</dd>
                  <dt>commentaar</dt>
                  <dd>{note.comments.length}</dd>
                </dl>
              </article>
            ))
          }
          <article className="note-card">
            <h3 className="next"><i className="fas fa-arrow-right"></i></h3>
            <dl>
              <dt>Ga naar</dt>
              <dd>
                <Link to={`/profile/${otherUser.id}/{privateContent.totalPages - 1}`}>Laatste</Link> of<br />
                {makeNextLink(otherUser.id, privateContent.last)}
              </dd>
              <dt>Pagina</dt>
              <dd>Nu op {privateContent.number + 1} van {privateContent.totalPages}</dd>
            </dl>
          </article>
        </>)
      }
    </div>);
}

export default Profile;
