import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SignIn from 'components/SignIn';

export default function SignInPage() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={4}>
          <SignIn />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <p>
          If you don't have an account, you can
          {' '}
          <Link to="/signup">sign up.</Link>
        </p>
      </Row>
    </Container>
  );
}
