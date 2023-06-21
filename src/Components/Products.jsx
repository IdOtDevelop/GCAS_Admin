import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { productRoute, productsRoute, generalproductRoute } from '../utils/APIRoutes'
import { FaTrash, FaEdit, FaTable } from 'react-icons/fa';
import Addproducts from './Addproducts';
import { ToastContainer, toast } from 'react-toastify';
import AddTable from './AddTable'
function Products({ setshowAddProduct, showAddProduct }) {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
    };
    const [showAddTable, setshowAddTable] = useState(false);
    const [product, setProduct] = useState({});
    const [prod, setProd] = useState([]);
    const [prodID, setprodID] = useState('');

    useEffect(() => {
        axios.get(productsRoute)
            .then(res => setProd(res.data))
    }, []);

    async function handleEdit(e, id) {
        setshowAddProduct(true);
        try {
            const { data } = await axios.get(generalproductRoute + "/" + id);
            if (typeof data === 'string')
                toast(data, toastOptions);
            else
                setProduct(data)
        } catch (err) {
            console.log(err);
            toast.error("Internal server Error", toastOptions)
        }
    }

    async function handleDelete(e, product_code) {
        console.log(product_code)
        try {
            const { data } = await axios.delete(productRoute + "/" + product_code);
            toast.success(data, toastOptions)
        } catch (err) {
            console.log(err);
            toast.error("Internal server Error", toastOptions)
        }
    }

    async function handleEditTable(e, product_code) {
        setshowAddTable(true);
        setprodID(product_code);
    }

    return (
        <>
            {
                prod.length == 0 ?
                    <h1 className="text-center text-xl">No products found</h1>
                    :
                    prod.map(p =>
                        <div key={p._id} className="flex justify-between p-4 mx-16 bg-slate-100">
                            <h1 className="text-2xl">{p.product_name}</h1>
                            <div className="flex justify-center items-center gap-4">
                                <FaTable size={20} onClick={e => handleEditTable(e, p._id)} />
                                <FaEdit size={20} onClick={e => handleEdit(e, p._id)} />
                                <div className="bg-red-500 p-2 rounded">
                                    <FaTrash size={20} color="white" onClick={(e) => handleDelete(e, p.product_code)} />
                                </div>
                            </div>
                        </div>
                    )
            }
            {
                showAddProduct &&
                <div className="absolute inset-0">
                    {
                        product ?
                            <Addproducts showProduct={setshowAddProduct} item={product} editState={setProduct} /> :
                            <Addproducts showProduct={setshowAddProduct} />
                    }
                </div>

            }
            {
                showAddTable &&
                <div className="absolute inset-0">
                    <AddTable showProduct={setshowAddTable} id={prodID} />
                </div>

            }
            <ToastContainer />
        </>
    )
}

export default Products
