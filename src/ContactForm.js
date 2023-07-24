import React from "react";
import { useReducer, useState } from "react";

const initialState = [
  { id: new Date(), name: "Preeti", email: "preeti@gmail.com" },
];

function reducer(state, action) {
  console.log("action", action.payload);
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      throw new Error();
  }
}

export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log(state);

  const addContact = (e) => {
    e.preventDefault();
    const contact = {
      id: Date.now(),
      name,
      email,
    };
    setName("");
    setEmail("");
    dispatch({ type: "add", payload: contact });
  };

  return (
    <div>
      <h1>Contact Form</h1>
      <form onSubmit={addContact}>
        <div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <button>Add Contact</button>
        </div>
      </form>
      <div style={{ backgroundColor: "lightGrey", width: "200px" }}>
        <ul>
          {state.map((item) => {
            return (
              <li key={item?.id} style={{ position: "inline" }}>
                <h2>{item?.name}</h2>
                <button
                  onClick={() =>
                    dispatch({ type: "delete", payload: { id: item.id } })
                  }
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
