import React, { useState, useEffect } from 'react'

import Pagination from '../../shared/Pagination'

import logic from '../../../logic'
import './index.scss'

const Home = ({ products, loading, postsPerPage, totalPosts, paginate, currentPage, funTotalPrice, funNumberItemsBag, funNumberItemsWishlist }) => {


    const [initialStateButAddToBag, setInitialStateButAddToBag] = useState(false)

    const [buttonRemoveFromBag, setButtonRemoveFromBag] = useState(false)

    const [initialStateButAddToWishlist, setInitialStateButAddToWishlist] = useState(false)

    const [buttonRemoveFromWishlist, setButtonRemoveFromWishlist] = useState(false)



    if (loading) return <h2>Loading...</h2>

    const handleToBag = (item) => {

        const { message, suma, numberItems } = logic.addToCart(item)

        if (message === 'added to cart') {
            setInitialStateButAddToBag(
                <button className="product__add-to-cart button button--secondary" onClick={(event) => {
                    event.preventDefault()
                    handleRemoveFromBag(item.uuid)
                }}>
                    Remove from Cart
                </button>
            )
        }
        funTotalPrice(suma)
        funNumberItemsBag(numberItems)
    }

    const handleRemoveFromBag = (id) => {
        const { message, suma, numberItems } = logic.removeFromCard(id)
        if (message === 'removed from cart') {
            setButtonRemoveFromBag(
                <button className="product__add-to-cart button button--primary" onClick={(event) => {
                    event.preventDefault()
                    handleToBag(item.uuid)
                }}>
                    Add to Cart
                </button>
            )
        }
        funTotalPrice(suma)
        funNumberItemsBag(numberItems)
    }

    const handleAddToWishlist = (id) => {
        const { message, numberItemsWishlist } = logic.addToWishlist(id)

        if (message === 'added to wishlist') {
            setInitialStateButAddToWishlist(
                <button className="product__wishlist-button button button--round button--inwishlist" onClick={(event) => {
                    event.preventDefault()
                    handleRemoveFromWishlist(item.uuid)

                }}>
                    <svg className="icon" width="20px" height="20px" viewBox="0 6 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" /*xmlns:xlink="http://www.w3.org/1999/xlink"*/>
                        <title>Wishlist Icon</title>
                        <polygon id="Wishlist-Icon" stroke="none" fillRule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                    </svg>
                </button>
            )
        }
        funNumberItemsWishlist(numberItemsWishlist)
    }

    const handleRemoveFromWishlist = (id) => {
        const { message, numberItemsWishlist } = logic.removeFromWishlist(id)
        if (message === 'removed from wishlist') {
            setButtonRemoveFromWishlist(
                <button className="product__wishlist-button button button--round button--wishlist" onClick={(event) => {
                    event.preventDefault()
                    handleAddToWishlist(item.uuid)

                }}>
                    <svg className="icon" width="20px" height="20px" viewBox="0 6 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" /*xmlns:xlink="http://www.w3.org/1999/xlink"*/>
                        <title>Wishlist Icon</title>
                        <polygon id="Wishlist-Icon" stroke="none" fillRule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                    </svg>
                </button>
            )
        }
        funNumberItemsWishlist(numberItemsWishlist)
    }

    const productsInBag = JSON.parse(localStorage.getItem('bag'))

    const productsInWishlist = JSON.parse(localStorage.getItem('wishlist'))


    return (

        <main className="product-page">
            <div className="container">
                <ul className="product-list">
                    {products && products.map(function (item) {

                        let isInBag = false

                        let isInWishlist = false

                        if (Array.isArray(productsInBag)) isInBag = productsInBag.some(inBag => inBag.uuid === item.uuid)
                        if (Array.isArray(productsInWishlist)) isInWishlist = productsInWishlist.some(id => id === item.uuid)

                        return (

                            <li key={item.uuid} className="product-list__item">
                                <article className="product" itemScope itemType="http://schema.org/Product">
                                    <figure className="product__image-wrapper">
                                        <img className="product__image" src={item.cover_image_url} alt="Product" itemProp="image" />

                                        {isInWishlist ?

                                            <button className="product__wishlist-button button button--round button--inwishlist" onClick={(event) => {
                                                event.preventDefault()
                                                handleRemoveFromWishlist(item.uuid)
                                            }}>
                                                <svg className="icon" width="20px" height="20px" viewBox="0 6 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" /*xmlns:xlink="http://www.w3.org/1999/xlink"*/>
                                                    <title>Wishlist Icon</title>
                                                    <polygon id="Wishlist-Icon" stroke="none" fillRule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                                                </svg>
                                            </button>

                                            :

                                            <button className="product__wishlist-button button button--round button--wishlist" onClick={(event) => {
                                                event.preventDefault()
                                                handleAddToWishlist(item.uuid)

                                            }}>
                                                <svg className="icon" width="20px" height="20px" viewBox="0 6 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" /*xmlns:xlink="http://www.w3.org/1999/xlink"*/>
                                                    <title>Wishlist Icon</title>
                                                    <polygon id="Wishlist-Icon" stroke="none" fillRule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                                                </svg>
                                            </button>


                                        }

                                    </figure>
                                    <div className="product__details">
                                        <h1 className="product__title" itemProp="brand">{item.title}</h1>
                                        <p className="product__subtitle" itemProp="description">{item.description}</p>
                                        <div className="product__price" itemScope itemType="http://schema.org/Offer">
                                            {item.discount > 0 ?
                                                <div><span class="product__price--strike">{item.original_retail_price.formatted_value}</span> <span class="product__price--discounted" itemProp="price">{item.retail_price.formatted_value}</span></div>
                                                :
                                                <span className="product__price" itemProp="price">{item.original_retail_price.formatted_value}</span>
                                            }
                                        </div>
                                        {
                                            isInBag ?
                                                <button className="product__add-to-cart button button--secondary" onClick={(event) => {
                                                    event.preventDefault()
                                                    handleRemoveFromBag(item.uuid)
                                                }}>
                                                    Remove from Cart
                                                </button>
                                                :
                                                <button className="product__add-to-cart button button--primary" onClick={(event) => {
                                                    event.preventDefault()
                                                    handleToBag(item)
                                                }}>
                                                    Add to Cart
                                                </button>
                                        }
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
        </main >
    )
}
export default Home;