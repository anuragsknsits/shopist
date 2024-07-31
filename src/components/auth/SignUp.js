import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { registerRequest } from '../../redux/actions/signupAction';
import '../../styles/Login.css';

const SignUp = () => {
  const [user, setUser] = useState({ username: '', password: '', role: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);

  const handleChange = ({ target: { name, value } }) => {
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(user));
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="login-form">
            <h1 className='h1'>Sign Up</h1>
            <Form onSubmit={handleSubmit} className="p-4 border rounded">
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  autoComplete="new-password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  placeholder="Enter role"
                  required
                  autoComplete="organization-title"
                />
              </Form.Group>

              {error && <div className="text-danger">{error}</div>}

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
