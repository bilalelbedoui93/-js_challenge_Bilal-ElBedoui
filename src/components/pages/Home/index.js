import React, { useState, useEffect } from 'react'
import Pagination from '../../shared/Pagination'

import './index.scss'

const Home = ({ products, loading, postsPerPage, totalPosts, paginate, currentPage }) => {

    if (loading) return <h2>Loading...</h2>



    return (

        <main className="product-page">
            <div className="container">
                <ul className="product-list">
                    {products && products.map(function (item) {

                        return (

                            <li key={item.uuid} className="product-list__item">
                                <article className="product" itemScope itemType="http://schema.org/Product">
                                    <figure className="product__image-wrapper">
                                        <img className="product__image" src={item.cover_image_url} alt="Product" itemProp="image" />
                                        <button className="product__wishlist-button button button--round button--wishlist">
                                            <svg className="icon" width="20px" height="20px" viewBox="0 6 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" /*xmlns:xlink="http://www.w3.org/1999/xlink"*/>
                                                <title>Wishlist Icon</title>
                                                <polygon id="Wishlist-Icon" stroke="none" fillRule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                                            </svg>
                                        </button>
                                    </figure>
                                    <div className="product__details">
                                        <h1 className="product__title" itemProp="brand">{item.title}</h1>
                                        <p className="product__subtitle" itemProp="description">{item.description}</p>
                                        <div className="product__price" itemScope itemType="http://schema.org/Offer">
                                            {item.discount > 0 ?
                                                <div><span class="product__price--strike">{item.original_retail_price.formatted_value}</span> <span class="product__price--discounted" itemProp="price">{item.retail_price.formatted_value}</span></div>
                                                :
                                                <span className="product__price" itemProp="price">{item.retail_price.formatted_value}</span>
                                            }
                                        </div>
                                        <button className="product__add-to-cart button button--primary">Add to Cart</button>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={totalPosts}
                    paginate={paginate}
                    currentPage={currentPage}
                />

            </div >
        </main>

    )


}
export default Home;