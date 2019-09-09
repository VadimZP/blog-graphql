import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SignUp from 'components/SignUp';

export default function SignUpPage() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={4}>
          <SignUp />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <p>
          If you already have an account, you can
          {' '}
          <Link to="/signin">sign in.</Link>
        </p>
      </Row>
    </Container>
  );
}
