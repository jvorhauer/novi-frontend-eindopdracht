import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './Auth.css';

function SignIn() {
  const { handleSubmit, register } = useForm();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  async function onSubmit(data) {
    console.log(data);
    setError("");
    try {
      const result = await axios.post(
        "https://sheltered-gorge-50410.herokuapp.com/api/auth/login",
        data
      );
      console.log("result", result);
      login(result.data.token);
    } catch (e) {
      console.error(e);
      setError("Inloggen is mislukt. Probeer het nog eens...");
    }
  }

  return (
    <div className="center">
      <h1>Aanmelden</h1>
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
    </div>
  );
}

export default SignIn;
