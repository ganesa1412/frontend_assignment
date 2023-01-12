import React from 'react'
import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import Ripple from '../components/Ripple'

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            url: `https://dummyapi.io/data/v1/post?created=1`,
            tag: ''
        };
    }
    componentDidMount() {
        AOS.init({
            duration: 1000
        })
        fetch(this.state.url,{
            method: 'GET',
            headers: {
                'app-id' : '62996cb2689bf0731cb00285'
            }
        })
        .then((response) => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                })
            }
        )
    }
    click = () => {
        fetch((this.state.tag!=''?`https://dummyapi.io/data/v1/tag/`+this.state.tag+`/post?created=1`:`https://dummyapi.io/data/v1/post?created=1`),{
            method: 'GET',
            headers: {
                'app-id' : '62996cb2689bf0731cb00285'
            }
        })
        .then((response) => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                })
            }
        )
    }
    change = e => {
        this.setState({
            tag: e.target.value
        })
    }
    render(){
        const { error, isLoaded, items } = this.state
        if (error) {
            return <div>Error: {error.message}</div>
          } else if (!isLoaded) {
            return <Ripple/>
          } else {
            return(
                <Layout page="home">
                    <InputGroup className="mb-4 w-50">
                        <Form.Control
                            placeholder="Search by tag (single tag)"
                            value={this.state.tag}
                            onChange={this.change}
                            />
                        <Button variant="primary" onClick={this.click}>
                            Search
                        </Button>
                    </InputGroup>

                    <Row>
                        {items.map(item => (
                            <PostCard
                            image={item.image}
                            username={item.owner.firstName + " " + item.owner.lastName}
                            caption={item.text}
                            tags={item.tags}/>
                        ))}
                    </Row>
                </Layout>
            )
        }
    }
}

export default Home