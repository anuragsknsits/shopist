import React, { useState,  useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { loginRequest } from '../../redux/actions/loginAction';
import  '../../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function from React Router
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const handleChange = ({ target: { name, value } }) => {
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(loginRequest(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="login-form">
      <h1>Log In</h1>
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
          />
        </Form.Group>

        {error && <div className="text-danger">{error}</div>}

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          ) : (
            'Login'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
