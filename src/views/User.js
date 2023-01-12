import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import AOS from 'aos'
import 'aos/dist/aos.css'
import swal from 'sweetalert'
import axios from 'axios'

import Layout from '../components/Layout'
import Ripple from '../components/Ripple'

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            placeholder : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg',
            modal_show : false,
            preview_show : false,
            preview : '',
            action : {
                title : '',
                url: '',
                method: ''
            },
            post_data : {
                title : 'mr',
                firstName : '',
                lastName : '',
                email : '',
                picture : ''
            }
        }
    }
    componentDidMount() {
        AOS.init({
            duration: 1000
        })
        fetch('https://dummyapi.io/data/v1/user?created=1',{
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
    handleClose = () => {
        this.setState({
            modal_show: false
        })
    }
    handleShowCreate = () => {
        this.setState({
            modal_show: true,
            action: {
                title: 'Tambah Data',
                url: 'https://dummyapi.io/data/v1/user/create?created=1',
                method: 'POST'
            },
            post_data : {
                title : 'mr',
                firstName : '',
                lastName : '',
                email : '',
                picture : ''
            },
            preview_show: false,
            preview: ''
        })
    }
    handleShowEdit(id) {
        this.setState({
            modal_show: true,
            action: {
                title: 'Edit Data',
                url: 'https://dummyapi.io/data/v1/user/'+id+'?created=1',
                method: 'PUT'
            }
        })
        fetch('https://dummyapi.io/data/v1/user/'+id+'?created=1',{
            method: 'GET',
            headers: {
                'app-id' : '62996cb2689bf0731cb00285'
            }
        })
        .then((response) => response.json())
        .then(
            (result) => {
                this.setState({
                    post_data : {
                        title : result.title,
                        firstName : result.firstName,
                        lastName : result.lastName,
                        email : result.email,
                        picture :result.picture
                    },
                    preview_show: true,
                    preview: result.picture
                })
            }
        )
    }
    setTitle = (e) => {
        this.setState({post_data: {...this.state.post_data, title : e.target.value}})
    }
    setFirstName = (e) => {
        this.setState({post_data: {...this.state.post_data, firstName : e.target.value}})
    }
    setLastName = (e) => {
        this.setState({post_data: {...this.state.post_data, lastName : e.target.value}})
    }
    setEmail = (e) => {
        this.setState({post_data: {...this.state.post_data, email : e.target.value}})
    }
    postData = (e) => {
        var {action, post_data} = this.state;
        if(action.method == 'POST'){
            axios.post(action.url, post_data, {
                headers: {
                    'app-id' : '62996cb2689bf0731cb00285'
                }
            })
            .then(res => {
                if(res.status == 200){
                    swal({
                        title: "Berhasil " + action.title,
                        icon: "success"
                    }).then((confirm) => {
                        window.location.reload(true)
                    })
                }
            }).catch((e) => {
                swal({
                    title: "Gagal " + action.title,
                    text: e.message,
                    icon: "error"
                })
            })
        }else{
            axios.put(action.url, post_data, {
                headers: {
                    'app-id' : '62996cb2689bf0731cb00285'
                }
            })
            .then(res => {
                if(res.status == 200){
                    swal({
                        title: "Berhasil " + action.title,
                        icon: "success"
                    }).then((confirm) => {
                        window.location.reload(true)
                    })
                }
            }).catch((e) => {
                swal({
                    title: "Gagal " + action.title,
                    text: e.message,
                    icon: "error"
                })
            })
        }
    }
    handleDelete(id){
        swal("Are you sure you want to delete this data?", {
            buttons: ["No", "Yes"],
        }).then((confirm) => {
            if(confirm){
                axios.delete('https://dummyapi.io/data/v1/user/'+id+'?created=1', {
                    headers: {
                        'app-id' : '62996cb2689bf0731cb00285'
                    }
                })
                .then(res => {
                    if(res.status == 200){
                        swal({
                            title: "Berhasil Hapus Data",
                            icon: "success"
                        }).then((confirm) => {
                            window.location.reload(true)
                        })
                    }
                }).catch((e) => {
                    swal({
                        title: "Gagal Hapus Data",
                        text: e.message,
                        icon: "error"
                    })
                })
            }
        });
    }
    setPreview = e => {
        this.setState({
            post_data: {...this.state.post_data, picture: e.target.value},
            preview: e.target.value,
            preview_show: (e.target.value!='')
        })
    }
    closePreview = () =>{
        this.setState({
            preview_show: false
        })
    }
    render(){
        const { error, isLoaded, items, modal_show, preview_show } = this.state

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <Ripple/>
        } else {
            return(
                <Layout page="user">
                    <Button variant='outline-light' size='lg' className='mb-4' onClick={this.handleShowCreate}>Create User</Button>

                    <Card body className='w-75'>
                        <Table striped hover className='text-center' responsive>
                            <thead className='bg-dark text-white'>
                                <tr>
                                    <th>Name</th>
                                    <th>Picture</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr>
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>
                                            <img src={item.picture!=''?item.picture:this.state.placeholder} class='table-img' />
                                        </td>
                                        <td width='25%'>
                                            <Button variant='warning block' onClick={() => this.handleShowEdit(item.id)}>Edit</Button>&nbsp;
                                            <Button variant='danger' onClick={() => this.handleDelete(item.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>

                    <Modal show={modal_show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.action.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Select value={this.state.post_data.title} onChange={this.setTitle}>
                                    <option>mr</option>
                                    <option>mrs</option>
                                    <option>miss</option>
                                </Form.Select>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" value={this.state.post_data.firstName} onChange={this.setFirstName} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" value={this.state.post_data.lastName} onChange={this.setLastName} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={this.state.post_data.email} onChange={this.setEmail} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Picture</Form.Label>
                                <Form.Control type="text" placeholder="Picture (URL)" value={this.state.post_data.picture} onChange={this.setPreview} />
                            </Form.Group>
                            
                            <Alert show={preview_show} variant="dark" dismissible onClose={this.closePreview}>
                                <img src={this.state.preview} class='w-100' />
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.postData} type="submit">
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Layout>
            )
        }
    }
}

export default User