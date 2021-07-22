import axios from "axios";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";

function AddNote() {
  const {user} = useContext(AuthContext);
  const {handleSubmit, register} = useForm();
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  async function onSubmit(data) {
    console.log(data);
    setError("");
    if (!token) {
      setError("Niet ingelogd!");
    } else {
      try {
        const result = await axios.post(
          "https://sheltered-gorge-50410.herokuapp.com/api/notes",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("result", result);
      } catch (e) {
        console.error(e);
        setError("Opslaan is mislukt. Probeer het nog eens...");
      }
    }
  }

  return (
    <>
      <h1>Nieuwe Notitie</h1>
      <section>
        {token && user && (
          <>
            <h2>Gebruiker gegevens</h2>
            <p>
              <strong>Gebruikersnaam:</strong> {user.username}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title-field">
          Titel:
          <input
            type="text"
            id="title-field"
            name="title"
            {...register("title")}
          />
        </label>
        <label htmlFor="body-field">
          Notitie:
          <textarea
            id="body-field"
            cols="80"
            rows="5"
            name="body"
            {...register("body")}
          />
        </label>
        <button type="submit" className="form-button">
          Inschieten
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default AddNote;
