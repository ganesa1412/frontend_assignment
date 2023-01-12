import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Sidebar from './Sidebar'

class Layout extends React.Component{
    render(){
        return(
            <Row>
                <Sidebar active={this.props.page}/>
                <Col md="11" className='content p-5'>
                    <div data-aos="fade" data-aos-delay="400">
                        {this.props.children}
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Layout