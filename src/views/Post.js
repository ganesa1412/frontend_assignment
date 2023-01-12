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

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            users: [],
            placeholder : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg',
            modal_show : false,
            preview_show : false,
            preview : '',
            action : {
                title : '',
                url: '',
                method: ''
            },
            tags_view: '',
            post_data : {
                text : '',
                likes : 0,
                tags : [],
                owner : ''
            }
        }
    }
    componentDidMount() {
        AOS.init({
            duration: 1000
        })
        fetch('https://dummyapi.io/data/v1/post?created=1',{
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
                    users: result.data
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
                url: 'https://dummyapi.io/data/v1/post/create?created=1',
                method: 'POST'
            },
            post_data : {
                text : '',
                likes : 0,
                tags : [],
                owner : '',
                image: ''
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
                url: 'https://dummyapi.io/data/v1/post/'+id+'?created=1',
                method: 'PUT'
            }
        })
        fetch('https://dummyapi.io/data/v1/post/'+id+'?created=1',{
            method: 'GET',
            headers: {
                'app-id' : '62996cb2689bf0731cb00285'
            }
        })
        .then((response) => response.json())
        .then(
            (result) => {
                this.setState({
                    tags_view : this.tagsJoin(result.tags),
                    post_data : {
                        text :  result.text,
                        likes : result.likes,
                        tags :  result.tags,
                        owner : result.owner.id,
                        image : result.image
                    },
                    preview_show: true,
                    preview: result.image
                })
            }
        )
    }
    setText = (e) => {
        this.setState({post_data: {...this.state.post_data, text : e.target.value}})
    }
    setTags = (e) => {
        this.setState({post_data: {...this.state.post_data, tags : e.target.value.replaceAll('#', '').split(" ")}, tags_view: e.target.value})
    }
    setLikes = (e) => {
        this.setState({post_data: {...this.state.post_data, likes : e.target.value}})
    }
    setOwner = (e) => {
        this.setState({post_data: {...this.state.post_data, owner : e.target.value}})
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
                axios.delete('https://dummyapi.io/data/v1/Post/'+id+'?created=1', {
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
            post_data: {...this.state.post_data, image: e.target.value},
            preview: e.target.value,
            preview_show: (e.target.value!='')
        })
    }
    closePreview = () =>{
        this.setState({
            preview_show: false
        })
    }
    tagsJoin(tags){
        var retags = ''
        tags.map(function(tag, index){
            retags += '#'+tag+' '
        })
        return retags
    }
    render(){
        const { error, isLoaded, items, modal_show, preview_show, users } = this.state

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <Ripple/>
        } else {
            return(
                <Layout page="post">
                    <Button variant='outline-light' size='lg' className='mb-4' onClick={this.handleShowCreate}>Create Post</Button>

                    <Card body>
                        <Table striped hover className='text-center' responsive>
                            <thead className='bg-dark text-white'>
                                <tr>
                                    <th>Text</th>
                                    <th>Tags</th>
                                    <th>Image</th>
                                    <th>User</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr>
                                        <td>{item.text}</td>
                                        <td>{this.tagsJoin(item.tags)}</td>
                                        <td>
                                            <img src={item.image} class='table-img' />
                                        </td>
                                        <td>{item.owner.firstName} {item.owner.lastName}</td>
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
                                <Form.Select value={this.state.post_data.owner} onChange={this.setOwner}>
                                    <option value=''>-Pilih User-</option>
                                    {users.map(user => (
                                        <option value={user.id}>{user.firstName} {user.lastName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Text</Form.Label>
                                <Form.Control type="text" placeholder="Text" value={this.state.post_data.text} onChange={this.setText} maxlength="50" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" placeholder="image (URL)" value={this.state.post_data.image} onChange={this.setPreview} />
                            </Form.Group>
                            
                            <Alert show={preview_show} variant="dark" dismissible onClose={this.closePreview} className='mb-3'>
                                <img src={this.state.preview} class='w-100' />
                            </Alert>

                            <Form.Group className="mb-3">
                                <Form.Label>Likes</Form.Label>
                                <Form.Control type="number" placeholder="Likes" value={this.state.post_data.likes} onChange={this.setLikes} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control type="text" placeholder="Tags" value={this.state.tags_view} onChange={this.setTags} />
                            </Form.Group>
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

export default Post