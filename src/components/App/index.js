import React, { useState, useEffect } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import logic from '../../logic'

import './index.scss'

import Home from '../pages/Home'
import Nav from '../shared/Nav'
import Footer from '../shared/Footer'

const App = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(6)

    useEffect(function () {
        fetchPosts()
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

    const paginate = pageNumber => setCurrentPage(pageNumber)


    //Get current posts

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)


    return (
        <div>

            {console.log('rendering <App>...')}

            <Nav />

            <Home
                products={currentPosts}
                loading={loading}
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />

            <Footer />


        </div>
    )


}
export default App;