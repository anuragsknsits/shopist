import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/Login.css'


const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  //const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/authenticate', user);
      console.log('User logged in:', response.data);
      // Save token to localStorage or context
      localStorage.setItem('authToken', response.data.token);
      // Redirect to a different page
      // history.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form className="login-form" onSubmit={handleLogin}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">

          <Form.Label column sm="2"> Email</Form.Label>

          <Col sm="10">
            <Form.Control
              type="text"
              value={user.username}
              placeholder="Email"
              name="username"
              onChange={handleChange}
              size="lg"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              value={user.password}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              size="lg"
            />
          </Col>
        </Form.Group>

        {error && (
          <Row className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <div className="text-danger">{error}</div>
            </Col>
          </Row>
        )}

        <Row className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <button type="submit" className="btn btn-primary">Login</button>
          </Col>
        </Row>

      </Form>
    </div>
  );
};

export default Login;
