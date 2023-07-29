import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productRoute, addTable } from "../utils/APIRoutes";
import { FaWindowClose, FaPlus } from "react-icons/fa"

function AddTable({ showProduct, id, item }) {
  const [about, setAbout] = useState([{ title: "", content: "" }]);

  useEffect(() => {
    if (item) {
      setAbout([...about, { title: "", content: "" }])
    }
  }, [item]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleSpec = (event, index) => {
    const { name, value } = event.target;
    const aboutlist = about;
    aboutlist[index][name] = value;
    setAbout(aboutlist)
  }

  const validateForm = () => {
    return true;
  };

  const handleClose = () => {
    showProduct(false);
  }

  const handleAdd = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        axios
          .patch(addTable + "/" + id, about)
          .then(() => showProduct(cr => !cr))
      } catch (err) {
        toast.error("Internal server Error", toastOptions)
      }
    }
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleAdd(event)}>
          <div className="brand">
            <h1>Add Table</h1>
            <FaWindowClose color="white" onClick={handleClose} />
          </div>
          {
            about.map((a, i) =>
            (
              <div key={i} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Specs title"
                  name="title"
                  defaultValue={a.title}
                  onChange={(e) => handleSpec(e, i)}
                />
                <input
                  type="text"
                  placeholder="Specs Content"
                  name="content"
                  defaultValue={a.content}
                  onChange={(e) => handleSpec(e, i)}
                />
              </div>
            ))

          }
          <input type="button" value="Spec's +" onClick={e => setAbout([...about, { title: "", content: "" }])} />
          <button type="submit">Add Table</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color:  #eab308;
    border-radius: 2rem;
    padding: 2.5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid green;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid yellow;
      outline: none;
    }
  }
  input::placeholder {
    color: white !important;
  }
  button {
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
      background-color: green;
    &:hover {

    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #bd93f9;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #50fa7b;
      }
    }
  }
`;

export default AddTable