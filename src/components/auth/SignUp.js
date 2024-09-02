import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { registerRequest } from '../../redux/actions/signupAction';
import { fetchRolesRequest } from '../../redux/actions/roleActions';
import '../../styles/Login.css';

const SignUp = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', emailId: '', password: '', role: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRolesRequest());
  }, [dispatch]);

  const { roles, loading: rolesLoading, error: rolesError } = useSelector(state => state.role);
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
        <Col xs={12} md={6} lg={8}>
          <div className="login-form">
            <h1 className="h1 text-center">Sign Up</h1>
            <Form onSubmit={handleSubmit} className="p-4 border rounded">

              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  required
                  autoComplete="given-name"
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  required
                  autoComplete="family-name"
                />
              </Form.Group>

              <Form.Group controlId="formEmailId">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  name="emailId"
                  value={user.emailId}
                  onChange={handleChange}
                  placeholder="Enter Email ID"
                  required
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                  autoComplete="new-password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  required
                  disabled={rolesLoading} // Disable while roles are loading
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </Form.Select>
                {rolesError && <div className="text-danger">{rolesError}</div>}
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
