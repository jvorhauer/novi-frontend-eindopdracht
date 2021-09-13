import React from 'react';
import { Link } from "react-router-dom";
import './NotSignedIn.css';

const NotSignedIn = () => {

  return (
    <article className="note-error-card">
      <h3 className="error">U bent niet aangemeld!</h3>
      <p>
        Deze pagina is alleen beschikbaar voor aangemelde gebruikers!
      </p>
      <p>
        Je kunt jezelf hier <Link to="/signin">aanmelden</Link> of<br />
        <Link to="/signup">registeren</Link> als je nog geen account hebt.
      </p>
    </article>
  )
}

export default NotSignedIn;