import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'


import ReviewPage from './ReviewPage';
import axios from 'axios';




export default function ProductDetail() {


    const { id } = useParams()
    const [api, setapi] = useState({})
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);



    const fetchapi = async () => {
        try {

            const response = await axios(`${BASE_URL}/api/products/${id}.json`)

            const data = response.data

            setapi(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        console.log("API DATA:", api);

        fetchapi()
    }, [id]);

    if (loading) return <h2>Loading...</h2>;


    return (
        <>
            <div className="container py-5">

                <div className="row">
                    {/* image Section  */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <img
                            src={api?.imageUrl || ""}
                            alt="Image"
                            className="img-fluid mb-3"
                        />
                        <div className="d-flex">

                        </div>
                    </div>
                    {/* Product Details */}

                    <div className="col-12 col-md-6 col-lg-3">
                        <h2>{api.title} </h2>

                        <div className="mt-2">

                        </div>
                        <table className="table mt-2">
                            <tbody>

                                <tr>
                                    <td className="fw-bold">Category</td>
                                    <td>{api.category} </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="mt-2">
                            <h4>About the product</h4>
                            <p> {api.description}</p>
                        </div>

                        <div className="d-flex gap-2 flex-wrap mt-3">
                            <button
                                type="button" className="btn btn-danger d-flex align-items-center">

                                <span className="ms-2">ADD TO CART</span>

                            </button>

                            <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center"
                            >
                                <span className="ms-2">$ {api.price}  BUY NOW</span>
                            </button>
                            <button
                                type="button" className="btn btn-warning d-flex align-items-center">

                                <span className="ms-2">ADD TO WISHLIST</span>

                            </button>

                        </div>

                    </div>
                    {/* Rewiews Section */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <ReviewPage />
                    </div>
                </div>
            </div>
        </>


    )
}
