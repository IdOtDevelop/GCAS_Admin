import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productRoute } from "../utils/APIRoutes";
import { FaWindowClose, FaPlus } from "react-icons/fa"

function Addproducts({ showProduct, item, editState }) {
  const [values, setValues] = useState({});
  const [images, setImages] = useState([""]);
  const [about, setAbout] = useState([{ title: "", content: "" }]);

  useEffect(() => {
    setValues({
      product_name: item?.product_name,
      product_code: item?.product_code,
      description: item?.description,
    })
    if (item && item.images)
      setImages(item.images)
    if (item && item.about)
      setAbout(item.about)
  }, [item]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleAbout = (event, index) => {
    const { name, value } = event.target;
    const aboutlist = about;
    aboutlist[index][name] = value;
    setAbout(aboutlist)
  }
  const handleImage = (event, index) => {
    const { value } = event.target;
    const imglist = images;
    imglist[index] = value;
    setImages(imglist);
  }

  const validateForm = () => {
    return true;
  };

  const handleClose = () => {
    showProduct(false);
    editState({});
    setImages([]);
  }

  const handleAdd = async (_event) => {
    if (validateForm()) {
      try {
        const { data } = await axios.post(productRoute, {
          ...values,
          images,
          about
        });
        if (typeof data === 'string') {
          toast.error(data, toastOptions);
        } else {
          showProduct(cr => !cr)
        }
      } catch (err) {
        toast.error("Internal server Error", toastOptions)
      }
    }
  }

  const handleEdit = async (_event) => {
    if (validateForm()) {
      try {
        const { data } = await axios.patch(productRoute, {
          ...values,
          images,
          about
        });
        toast.error(data, toastOptions);
        showProduct(cr => !cr);
      } catch (err) {
        toast.error("Internal server Error", toastOptions)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(item).length === 0)
      handleAdd(event);
    else
      handleEdit(event);
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>{Object.keys(item).length !== 0 ? "Edit product" : "Add product"}</h1>
            <FaWindowClose color="white" onClick={handleClose} />
          </div>
          <input
            type="text"
            placeholder="Product Name"
            name="product_name"
            value={values.product_name}
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="text"
            placeholder="product_code"
            name="product_code"
            value={values.product_code}
            onChange={(e) => handleChange(e)}
          />
          {
            images.map((image, ind) => {
              return <input
                key={ind}
                type="text"
                placeholder="images"
                name="images"
                defaultValue={image}
                onChange={(e) => handleImage(e, ind)}
              />
            })
          }
          <input
            type="text"
            placeholder="description"
            name="description"
            defaultValue={values.description}
            onChange={(e) => handleChange(e)}
          />
          {
            about.map((a, i) =>
            (
              <div key={i} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="About Title"
                  name="title"
                  defaultValue={a.title}
                  onChange={(e) => handleAbout(e, i)}
                />
                <input
                  type="text"
                  placeholder="About Content"
                  name="content"
                  defaultValue={a.content}
                  onChange={(e) => handleAbout(e, i)}
                />
              </div>
            ))

          }
          <div className="flex gap-4">
            <input type="button" value="img +" onClick={e => setImages([...images, ""])} />
            <input type="button" value="about +" onClick={e => setAbout([...about, { title: "", content: "" }])} />
          </div>
          <button type="submit">{Object.keys(item).length !== 0 ? "Edit product" : "Add product"}</button>
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

export default Addproducts
