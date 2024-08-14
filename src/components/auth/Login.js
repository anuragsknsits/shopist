import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../redux/actions/loginAction';
import '../../styles/Login.css';
import logo from '../../img/VKADLogo.jpg';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const handleChange = ({ target: { name, value } }) => {
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="d-none d-md-block">
          <div className="ad-container">
            <img src={logo} alt="VKAD Associate Advertisement" className="ad-image" />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className="login-form">
            <h1 className="h1 text-center">Log In</h1>
            <Form onSubmit={handleSubmit} className="p-4 border rounded">
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
              </Form.Group>

              {error && <div className="text-danger">{error}</div>}

              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                  'Login'
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
