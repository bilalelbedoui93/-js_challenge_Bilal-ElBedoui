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
    const [numberItems, setNumberItems] = useState(0)

    //Get current posts, pagination
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


    useEffect(function () {
        fetchPosts()
        totalPriceAndElementsQuantity(JSON.parse(localStorage.getItem('bag')))
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

    const totalPriceAndElementsQuantity = (products) => {
        const { suma, numberItems } = logic.totalPriceAndElementsQuantity(products)

        setTotalPrice(suma)
        setNumberItems(numberItems)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)


    return (
        <div>

            {console.log('rendering <App>...')}

            <Nav
                totalPrice={totalPrice}
                numberItems={numberItems}
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
                        funNumberItems={setNumberItems}
                    />}
                />

                <Route path={'/bag'} render={() =>
                    <Bag
                        productsInBag={JSON.parse(localStorage.getItem('bag'))}
                        totalPrice={totalPrice}
                        funTotalPrice={setTotalPrice}
                        funNumberItems={setNumberItems}
                    />}
                />

            </Switch>

            <Footer />


        </div>
    )


}
export default withRouter(App)
