import React, { useState, useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import logic from '../../logic'

import './index.scss'

import Home from '../pages/Home'
import Nav from '../shared/Nav'
import Footer from '../shared/Footer'
import Bag from '../pages/Bag'

const App = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)
    const [totalPrice, setTotalPrice] = useState(0)
    const [numberItemsBag, setNumberItemsBag] = useState(0)
    const [numberItemsWishlist, setNumberItemsWishlist] = useState(0)

    //Get current posts, pagination
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


    useEffect(function () {
        fetchPosts()
        totalPriceAndElementsQuantity()
        totalElementsWishlist()
    }, [])

    const fetchPosts = async () => {
        try {
            const _posts = await logic.retrieveAllProducts()
            setPosts(_posts)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const totalPriceAndElementsQuantity = () => {
        const products = JSON.parse(localStorage.getItem('bag'))
        const { suma, numberItems } = logic.totalPriceAndElementsQuantity(products)

        setTotalPrice(suma)
        setNumberItemsBag(numberItems)
    }

    const totalElementsWishlist = () =>{
        let result = JSON.parse(localStorage.getItem('wishlist'))
        if(result==null) result = []
        setNumberItemsWishlist(result.length)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)


    return (
        <div>

            {console.log('rendering <App>...')}

            <Nav
                totalPrice={totalPrice}
                numberItemsBag={numberItemsBag}
                numberItemsWishlist={numberItemsWishlist}
            />

            <Switch>

                <Route exact path={'/'} render={() =>
                    <Home
                        products={currentPosts}
                        loading={loading}
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                        currentPage={currentPage}
                        funTotalPrice={setTotalPrice}
                        funNumberItemsBag={setNumberItemsBag}
                        funNumberItemsWishlist={setNumberItemsWishlist}
                    />}
                />

                <Route path={'/bag'} render={() =>
                    <Bag
                        productsInBag={JSON.parse(localStorage.getItem('bag'))}
                        totalPrice={totalPrice}
                        funTotalPrice={setTotalPrice}
                        funNumberItemsBag={setNumberItemsBag}
                    />}
                />

            </Switch>

            <Footer />


        </div>
    )


}
export default withRouter(App)
