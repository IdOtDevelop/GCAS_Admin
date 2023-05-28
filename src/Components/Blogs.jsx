import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getblogsRoute, singleblogRoute, getblogRoute } from '../utils/APIRoutes'
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddBlogs from './AddBlogs';
import { ToastContainer, toast } from 'react-toastify';


function Products({
    setshowAddBlog,
    showAddBlog,
}) {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
    };

    const [blog, setBlog] = useState({});
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(getblogsRoute)
            .then(res => setBlogs(res.data))
    }, []);

    async function handleEdit(e, id) {
        setshowAddBlog(true);
        console.log(id)
        try {
            const { data } = await axios.get(getblogRoute + "/" + id);
            if (typeof data === 'string')
                toast(data, toastOptions);
            else
                setBlog(data)
        } catch (err) {
            console.log(err);
            toast.error("Internal server Error", toastOptions)
        }
    }

    async function handleDelete(e, id) {
        try {
            const { data } = await axios.delete(singleblogRoute + "/" + id);
            toast.success(data, toastOptions)
        } catch (err) {
            toast.error("Internal Server Error", toastOptions)
        }
    }
    return (
        <>
            {
                blogs.length == 0 ?
                    <h1 className="text-center text-xl">No Blogs found</h1>
                    :
                    blogs.map(b =>
                        <div id={b._id} className="flex justify-between p-4 mx-16 bg-slate-100">
                            <h1 className="text-2xl">{b.blog_title}</h1>
                            <div className="flex justify-center items-center gap-4">
                                <FaEdit size={20} onClick={e => handleEdit(e, b._id)} />
                                <div className="bg-red-500 p-2 rounded">
                                    <FaTrash size={20} color="white" onClick={(e) => handleDelete(e, b._id)} />
                                </div>
                            </div>
                        </div>
                    )
            }
            {
                showAddBlog &&
                <div className="absolute inset-0">
                    {
                        blog ?
                            <AddBlogs showBlog={setshowAddBlog} item={blog} editState={setBlog} /> :
                            <AddBlogs showBlog={setshowAddBlog} />
                    }
                </div>
            }
            <ToastContainer />
        </>
    )
}

export default Products
