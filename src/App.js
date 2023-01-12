import React from 'react'

import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Home from './views/Home'
import User from './views/User'
import Post from './views/Post'

class App extends React.Component{
    render(){
        return(
            <Container fluid>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/user" element={<User/>} />
                    <Route path="/post" element={<Post/>} />
                </Routes>
            </Container>
        )
    }
}

export default App