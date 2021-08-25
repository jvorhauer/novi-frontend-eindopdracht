import axios from "axios";
import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import makeUrl from '../../helpers/MakeUrl';
import './Auth.css';

function SignIn() {
  const {handleSubmit, register} = useForm();
  const {login} = useContext(AuthContext);
  const [error, setError] = useState("");

  function onSubmit(data) {
    console.log(data);
    setError("");
    axios.post(makeUrl("/api/auth/login"), data)
      .then(result => login(result.data.token))
      .catch(error => {
        console.error(error);
        setError("Inloggen is mislukt. Probeer het nog eens...");
      });
  }

  return (
    <div className="content">
      <article className="signin-card">
        <h3><i className="fas fa-sign-in-alt"></i>&nbsp;Aanmelden</h3>
        <p>
          met email adres en wachtwoord waarmee u geregistreerd hebt.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email-field">
            Emailadres:
            <input
              type="email"
              id="email-field"
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
          <button type="submit" className="form-button">
            Inloggen
          </button>
          {error && <p>{error}</p>}
        </form>
        <p>
          Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan
          eerst.
        </p>
      </article>

    </div>
  );
}

export default SignIn;
