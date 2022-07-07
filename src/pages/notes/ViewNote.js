import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import makeUrl from "../../helpers/MakeUrl";
import makeHeaders from "../../helpers/MakeHeaders";
import NotSignedIn from "../../components/errors/NotSignedIn";
import './Profile';

function ViewNote() {
  const { user } = useContext(AuthContext);
  const { id, mode } = useParams();
  const [privateContent, setPrivateContent] = useState(null);
  const token = localStorage.getItem("token");
  const { reset } = useForm();
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    function getNote() {
      axios.get(makeUrl(`/api/notes/${id}`), makeHeaders(token))
        .then(result => setPrivateContent(result.data))
        .catch(error => console.error(error));
    }

    if (token && id && mode) {
      getNote();
      reset({
        comment: "",
      })
    }
    setUpdated(false);
    // eslint-disable-next-line
  }, [token, id, updated, mode]);


  const NoteUpdateForm = () => {
    const { register, handleSubmit, setValue } = useForm();
    const history = useHistory();

    setValue('title', privateContent.title);
    setValue('body', privateContent.body);

    const onSubmit = data => {
      const payload = {
        title: data.title,
        body: data.body,
        userId: user.id
      }
      axios.put(makeUrl(`/api/notes/${id}`), payload, makeHeaders(token))
        .then(() => {
          reset({
            comment: "",
            title: privateContent.title,
            body: privateContent.body
          })
        })
        .catch(error => console.error(error));
      history.push(`/view/${id}/view`);
    }

    return (
      <form id="update-note-form" onSubmit={handleSubmit(onSubmit)} className="note-form">
        <label htmlFor="note-title-field">
          Titel:
          <input
            name="title"
            {...register('title', { maxLength: 255, required: true })}
          />
        </label>
        <label htmlFor="note-body-field">
          Notitie:<br />
          <textarea id="note-body-field"
            cols="32"
            rows="5"
            name="body"
            {...register('body', { maxLength: 1024, required: true })}
          />
        </label>
        <button type="submit" className="form-button">Bewaar</button>
      </form>
    );
  }

  const GoBack = () => {
    return (
        <a href="/profile">notities</a>
    )
  }

  const CommentForm = () => {
    const { handleSubmit, register } = useForm();

    const onSubmit = data => {
      const payload = {
        comment: data.comment,
        stars: data.stars
      };
      axios.post(makeUrl(`/api/notes/${id}/comments`), payload, makeHeaders(token))
        .then(result => {
          setUpdated(result.status === 200);
        })
        .catch(error => console.error(error));
    }

    return (
      <form id="new-comment-form" onSubmit={handleSubmit(onSubmit)} className="comment-form">
        <label htmlFor="comment-field">
          Commentaar:
          <input
            type="text"
            id="comment-field"
            size="20"
            name="comment"
            placeholder="commentaar"
            {...register("comment", { required: true, minLength: 3, maxLength: 100 })} />
        </label>
        <label htmlFor="stars-field">
          Waardering:<br />
          <select {...register("stars")}>
            <option value="1">1 ster</option>
            <option value="2">2 sterren</option>
            <option value="3">3 sterren</option>
            <option value="4">4 sterren</option>
            <option value="5">5 sterren</option>
          </select>
        </label>
        <button type="submit" className="form-button">
          Lever
        </button>
      </form>
    );
  }


  const Stars = (props) => {
    return (
      <>
        <i className={`${props.rating > 0 ? "fas" : "far"} fa-star`}></i>
        <i className={`${props.rating > 1 ? "fas" : "far"} fa-star`}></i>
        <i className={`${props.rating > 2 ? "fas" : "far"} fa-star`}></i>
        <i className={`${props.rating > 3 ? "fas" : "far"} fa-star`}></i>
        <i className={`${props.rating > 4 ? "fas" : "far"} fa-star`}></i>
      </>
    );
  }

  return (
    <div className="content content-left">
      {!user && (
        <NotSignedIn />
      )}
      {user && privateContent && (
        <>
          <article className="note-card">
            <h3><i className="fas fa-arrow-left"></i></h3>
            <dl>
              <dt>Terug</dt>
              <dd>
                naar de <GoBack />
              </dd>
              <dt>van</dt>
              <dd>{privateContent.username}</dd>
            </dl>
          </article>
          {mode === "view" && (
            <article className="wider-note-card">
              <h3>
                <i className="far fa-file-alt"></i>&nbsp;{privateContent.title}
                {privateContent.userId === user.id && (
                  <Link to={`/view/${privateContent.id}/edit`} className="editor"><i className="far fa-edit"></i></Link>
                )}
              </h3>
              <dl>
                <dt>auteur</dt>
                <dd>{privateContent.username}</dd>
                <dt>gecreerd</dt>
                <dd>{privateContent.created}</dd>
                <dt>laatst gewijzigd</dt>
                <dd>{privateContent.updated}</dd>
                <dt>Tekst</dt>
                <dd>{privateContent.body}</dd>
              </dl>
            </article>
          )}
          {mode === "edit" && (
            <article className="wider-note-card">
              <h3>
                Bewerk [{privateContent.title}]
                <Link to={`/view/${privateContent.id}/view`} className="editor"><i className="far fa-window-close"></i></Link>
              </h3>
              <NoteUpdateForm />
            </article>
          )}

          {privateContent.comments.map((comment) => (
            <article className="note-card" key={comment.created} title={`Een notitie van ${comment.author}`}>
              <h3><i className="far fa-comment"></i>&nbsp;{comment.author}</h3>
              <dl>
                <dt>Wanneer</dt>
                <dd>{comment.created}</dd>
                <dt>Wat</dt>
                <dd>{comment.comment}</dd>
                <dt>Waardering</dt>
                <dd><Stars rating={`${comment.stars}`} /></dd>
              </dl>
            </article>
          ))}

          {mode === "view" && (
            <article className="note-card">
              <h3><i className="fas fa-comment-medical"></i>&nbsp;Meer commentaar</h3>
              <CommentForm />
            </article>
          )}
        </>
      )}
    </div>
  );
}

export default ViewNote;
