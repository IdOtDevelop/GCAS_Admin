import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Addproducts from '../Components/Addproducts';
import axios from "axios";
import { productsRoute, productRoute } from '../utils/APIRoutes';
import Products from "../Components/Products";
import Blogs from "../Components/Blogs";


function AdminDashBoard() {
    const [toggle, setToggle] = useState(true);
    const [showAddProduct, setshowAddProduct] = useState(false);
    const [showAddBlog, setshowAddBlog] = useState(false);

    return (
        <div>
            <div className="mx-16 my-8 flex justify-between m-auto">
                <div className="flex gap-4 bg-slate-200 rounded-full">
                    <button className={`p-3 rounded-full ${toggle ? "bg-yellow-500" : ""}`}
                        onClick={e => setToggle(true)}>Products</button>
                    <button className={`p-3 rounded-full ${!toggle ? "bg-yellow-500" : ""}`}
                        onClick={e => setToggle(false)}>Blogs</button>
                </div>
                {
                    toggle ?
                        <button className="p-3 bg-yellow-500 rounded-full"
                            onClick={(e) => setshowAddProduct(!showAddProduct)}>Add Product</button> :
                        <button className="p-3 bg-yellow-500 rounded-full"
                            onClick={(e) => setshowAddBlog(!showAddBlog)}>Add Blogs</button>
                }
            </div>
            {
                toggle ?
                    <Products
                        setshowAddProduct={setshowAddProduct}
                        showAddProduct={showAddProduct} /> :
                    <Blogs
                        showAddBlog={showAddBlog}
                        setshowAddBlog={setshowAddBlog} />
            }
        </div >
    )
}

export default AdminDashBoard
