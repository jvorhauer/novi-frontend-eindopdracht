import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Welkom bij Noviaal</h1>
      <section>
        <p>Noviaal is dé app om sociaal met notities om te gaan.</p>
        <p>
          Het is ook de eindopdracht voor de leerlijn <strong>Frontend</strong>{" "}
          van de HBO Software Development opleiding van NOVI.
        </p>
      </section>
      <section>
        <p>
          Als je ingelogd bent, bekijk dan de{" "}
          <Link to="/profile">Profielpagina</Link>
        </p>
        <p>
          Je kunt ook <Link to="/signin">aanmelden</Link> of jezelf{" "}
          <Link to="/signup">registeren</Link> als je nog geen account hebt.
        </p>
      </section>
    </>
  );
}

export default Home;
