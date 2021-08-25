import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './Home.css';

function Home() {

  const { user } = useContext(AuthContext);

  return (
    <div className="content">
      <article className="home-card">
        <h3>Welkom</h3>
        <p>Noviaal is dé app om sociaal met notities om te gaan.</p>
        <p>
          Het is ook de eindopdracht voor de leerlijn <strong>Frontend</strong>{" "}
          van de HBO Software Development opleiding van NOVI.
        </p>
      </article>
      <article className="home-card">
        {user && (
          <>
            <h3>Aangemeld</h3>
            <p>Ga naar je eigen <Link to="/profile">notities</Link></p>
          </>
        )}
        {!user && (
          <>
            <h3>Aanmelden</h3>
            <p>Na <Link to="/signin">aanmelden</Link> kun je je eigen en andermans notities bewonderen</p>
          </>
        )}
      </article>
      <article className="home-card">
        <h3>Registreren</h3>
        <p>
          Of je nu al aangemeld bent of nog geen account hebt bij Noviaal, iedereen kan zich <Link to="/signup">registeren</Link>
        </p>
      </article>
    </div>
  );
}

export default Home;
