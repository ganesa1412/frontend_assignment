import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import AOS from 'aos'
import 'aos/dist/aos.css'

class PostCard extends React.Component{
    componentDidMount() {
        AOS.init({
            duration: 1000
        })
    }
    render(){
        var tags = this.props.tags.map(function(tag, index){
          return <Badge className='m-1'>#{tag}</Badge>;
        })
        var placeholder = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
        return(
            <Col md="3" className='pb-4' data-aos="fade">
                <Card>
                    <Card.Img variant="top" src={this.props.image!=''?this.props.image:placeholder} className='card-image' />
                    <Card.Body>
                        <Card.Title className='card-title'>{this.props.username}</Card.Title>
                        <Card.Text>
                        {this.props.caption}
                        </Card.Text>
                        {tags}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default PostCard