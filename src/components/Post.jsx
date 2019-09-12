import React from 'react';
import { Card } from 'react-bootstrap';

const Post = ({text}) => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
        <Card.Text>{text}</Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
    </Card>
  )
}

export default Post;