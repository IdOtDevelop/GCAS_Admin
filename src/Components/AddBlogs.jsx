import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { singleblogRoute } from "../utils/APIRoutes";
import { FaWindowClose } from "react-icons/fa"

function AddBlogs({ showBlog, item, editState }) {
  // console.log(item)
  const [values, setValues] = useState({});
  const [sub_content, setSubContent] = useState([{ title: "", content: "" }]);

  useEffect(() => {
    setValues({
      blog_title: item.blog_title,
      blog_img: item.blog_img,
      summary: item.summary,
      main_content: item.main_content,
    })
    if (item && item.sub_content)
      setSubContent(item.sub_content)
  }, [item]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    return true;
  };

  const handleSubContent = (event, index, ind) => {
    const { name, value } = event.target;
    const subcontlist = sub_content;
    if (Array.isArray(subcontlist[index][name]))
      subcontlist[index][name][ind] = value
    else
      subcontlist[index][name] = value;
    console.log(subcontlist[index])
    setSubContent(subcontlist)
  }

  const handleClose = () => {
    showBlog(false);
    editState({});
  }

  const handleEdit = async (_event) => {
    if (validateForm()) {
      try {
        const { data } = await axios.patch(singleblogRoute, {
          ...values,
          sub_content
        });
        toast.error(data, toastOptions);
        showBlog(cr => !cr);
      } catch (err) {
        toast.error("Internal server Error", toastOptions)
      }
    }
  }

  const handleAdd = async (_event) => {
    if (validateForm()) {
      try {
        const { data } = await axios.post(singleblogRoute, {
          ...values,
          sub_content
        });
        if (typeof data === 'string') {
          toast.error(data, toastOptions);
        } else {
          showBlog(cr => !cr)
        }
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
            <h1>{Object.keys(item).length !== 0 ? "Edit Blog" : "Add Blog"}</h1>
            <FaWindowClose color="white" onClick={handleClose} />
          </div>
          <input
            type="text"
            placeholder="Blog title"
            name="blog_title"
            value={values.blog_title}
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="text"
            placeholder="Blog image"
            name="blog_img"
            value={values.blog_img}
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="text"
            placeholder="Summary "
            name="summary"
            value={values.summary}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="main content"
            name="main_content"
            value={values.main_content}
            onChange={(e) => handleChange(e)}
          />
          {
            sub_content.map((a, i) =>
            (
              <div key={i} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="About Title"
                  name="title"
                  defaultValue={a.title}
                  onChange={(e) => handleSubContent(e, i)}
                />
                {
                  Array.isArray(sub_content[i].content) ?
                    <div className="flex flex-col gap-4">
                      {
                        sub_content[i].content.map((l, ind) =>
                          <input
                            type="text"
                            placeholder="About List"
                            name="content"
                            defaultValue={sub_content[i].content[ind]}
                            onChange={(e) => handleSubContent(e, i, ind)}
                          />
                        )
                      }
                      <input type="button" value="Add list item" onClick={e => {
                        const subcontlist = sub_content;
                        subcontlist[i].content = [...subcontlist[i].content, ""];
                        setSubContent([...subcontlist])
                      }} />
                    </div>
                    :
                    <input
                      type="text"
                      placeholder="About Content"
                      name="content"
                      defaultValue={a.content}
                      onChange={(e) => handleSubContent(e, i)}
                    />
                }

              </div>
            ))
          }
          <div className="flex gap-8 ">
            <input type="button" value="about +" onClick={e => setSubContent([...sub_content, { title: "", content: "" }])} />
            <input type="button" value="about list +" onClick={e => setSubContent([...sub_content, { title: "", content: [""] }])} />
          </div>
          <button type="submit">{Object.keys(item).length !== 0 ? "Edit Blog" : "Add Blog"}</button>
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

export default AddBlogs
