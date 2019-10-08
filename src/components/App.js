import React, { useState, useEffect } from 'react'
import logic from '../logic'
import { Router, Route, Switch, Redirect } from 'react-router-dom'


const App = () => {

    const [entries, setEntries] = useState([])

    useEffect(function () {
        getEntries()
    }, [])

    const getEntries= async () => {
        const _entries = await logic.retrieveAllProducts()
        setEntries(_entries)
    }

    return (
        <div>

            {console.log('rendering <App>...')}

            {console.log('ENTRIES =====>', entries)}


            <h1>ESTA VA A SER MI APP</h1>


        </div>
    )


}
export default App;