import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import './Profile.css';

function ListNotes() {
  const [privateContent, setPrivateContent] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const {id} = useParams();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getPrivateContent() {
      try {
        const result = await axios.get(
          `https://sheltered-gorge-50410.herokuapp.com/api/notes/user/${id}`,
          {
            headers: {
              "Accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrivateContent(result.data);

        const result2 = await axios.get(
          `https://sheltered-gorge-50410.herokuapp.com/api/users/${id}`,
          {
            headers: {
              "Accept": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOtherUser(result2.data);
      } catch (e) {
        console.error(e);
      }
    }
    if (token && user) {
      getPrivateContent();
    }
  }, [token, user, id]);

  return (
    <>
      {user && privateContent && otherUser && (
        <section>
          <h2>Notities van {otherUser.name}</h2>
          <table>
            <thead>
            <tr>
              <th>Titel</th>
              <th>Aangemaakt</th>
              <th>Laatste gewijzigd</th>
            </tr>
            </thead>
            <tbody>
            {
              privateContent.map((note) => (
                <tr key={note.id}>
                  <td><Link to={{pathname: `/view/${note.id}`}}>{note.title}</Link></td>
                  <td>{note.created}</td>
                  <td>{note.updated}</td>
                  <td>{note.title}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </section>
      )}
   </>
  );

}

export default ListNotes;
