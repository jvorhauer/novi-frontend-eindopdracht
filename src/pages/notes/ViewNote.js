import axios from "axios";
import React, {useContext, useState, useEffect} from "react";
import ReactMarkdown from 'react-markdown';
import {Link, useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";

function ViewNote({match}) {
  const {user} = useContext(AuthContext);
  const {id} = useParams();
  const [privateContent, setPrivateContent] = useState(null);
  const token = localStorage.getItem("token");
  const {handleSubmit, register} = useForm();

  function BackButton({children}) {
    let history = useHistory();
    return (
      <button type="button" onClick={() => history.goBack()}>
        {children}
      </button>
    )
  }

  useEffect(() => {
    async function getNote() {
      try {
        const result = await axios.get(
          `https://sheltered-gorge-50410.herokuapp.com/api/notes/${id}`,
          {
            headers: {
              "Accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        console.log("result.data", result.data);
        setPrivateContent(result.data);
      } catch (e) {
        console.error(e);
      }
    }

    if (token && id) {
      getNote();
    }
  }, [token, id]);

  async function onSubmit(data) {
    console.log("comment: data", data);
    try {
      const result = await axios.post(
        `https://sheltered-gorge-50410.herokuapp.com/api/notes/${id}/comments`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("comment: result", result);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      {user && privateContent && (
        <>
          <h1>id is {id}</h1>
          <h3>title: {privateContent.title}</h3>
          <strong>Created: {privateContent.created}</strong><br />
          <strong>Updated: {privateContent.updated}</strong><br />
          <strong>User: {privateContent.name}</strong><br />
          <ReactMarkdown>{privateContent.body}</ReactMarkdown>
        </>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="comment-field">
          Commentaar:
          <input
            type="text"
            id="comment-field"
            name="comment"
            {...register("comment")} />
        </label>
        <label htmlFor="stars-field">
          Waardering:
          <select {...register("stars")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button type="submit" className="form-button">
          Inschieten
        </button>
      </form>

        <br />
      <Link to="/profile">Notities</Link>
      <br />
      <BackButton>Terug</BackButton>
    </>
  );
}

export default ViewNote;
