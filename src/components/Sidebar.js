import React from 'react'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUser, faImage } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faUser, faImage)

class Sidebar extends React.Component{
    render(){
        return(
            <Col md="1" className='sidebar py-5 px-3 text-center'>
                <ul>
                    <li className={this.props.active=='home'?'active':''}><a href="/"><FontAwesomeIcon icon="home"/><br/>Home</a></li>
                    <li className={this.props.active=='user'?'active':''}><a href="/user"><FontAwesomeIcon icon="user"/><br/>User</a></li>
                    <li className={this.props.active=='post'?'active':''}><a href="/post"><FontAwesomeIcon icon="image"/><br/>Post</a></li>
                </ul>
            </Col>
        )
    }
}

export default Sidebar