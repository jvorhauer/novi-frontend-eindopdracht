import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import makeUrl from '../../helpers/MakeUrl';

function SignUp() {
  const { handleSubmit, register } = useForm();
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState("");
  const [registerSuccess, toggleRegisterSuccess] = useState(false);
  const history = useHistory();

  function onSubmit(data) {
    setError("");
    toggleLoading(true);

    console.log(data);

    if (data.password !== data.again) {
      setError("Password en nogmaals zijn niet gelijk!");
      toggleRegisterSuccess(false);
    } else {
      axios.post(makeUrl("/api/auth/register"),
        { email: data.email, password: data.password, name: data.username, }
      ).then(result => {
        toggleRegisterSuccess(true);
        history.push("/signin");
      }).catch(e => {
        console.error(e);
        setError(`Het registreren is mislukt! (${e.message}); probeer het opnieuw`);
        toggleRegisterSuccess(false);
      });
    }
    toggleLoading(false);
  }

  return (
    <div className="content">
      <article className="signin-card">
        <h3><i className="fas fa-user-plus"></i>&nbsp;Registreren</h3>
        <p>
          Om toegang te krijgen tot je eigen notities en die van de andere Noviaal
          gebruikers moet je een account aanmaken.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email-field">
            Email:
            <input
              type="email"
              id="email-field"
              name="email"
              {...register("email")}
            />
          </label>

          <label htmlFor="username-field">
            Gebruikersnaam:
            <input
              type="text"
              id="username-field"
              name="username"
              {...register("username")}
            />
          </label>

          <label htmlFor="password-field">
            Wachtwoord:
            <input
              type="password"
              id="password-field"
              name="password"
              {...register("password")}
            />
          </label>

          <label htmlFor="password-again">
            Nogmaals:
            <input
              type="password"
              id="again-field"
              name="again"
              {...register("again")}
            />
          </label>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Bezig met registreren..." : "Maak account aan"}
          </button>
          {registerSuccess && (
            <p>
              Registreren is gelukt! Je kunt nu naar de <Link to="/signin">aanmeld</Link> pagina.
            </p>
          )}
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          Heb je al een account? Je kunt dan direct{" "}<Link to="/signin">aanmelden</Link> .
        </p>
      </article>
    </div>
  );
}

export default SignUp;
