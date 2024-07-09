import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { loginRequest } from '../../redux/actions/loginAction';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = ({ target: { name, value } }) => {
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(credentials));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <Form.Group as={Col} className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </Form.Group>

        {error && <div className="text-danger">{error}</div>}

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
