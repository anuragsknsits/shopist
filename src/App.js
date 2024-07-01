import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import AboutUs from './pages/About';
import { Login } from './components/auth/Login';
import Header from './components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { SignUp } from './components/auth/SignUp';


function App() {
  return (
    <Router>
      <div className="App">
        <Container fluid>
          <Row>
            <Col md={2} >
              <Header />
            </Col>
            <Col md={10}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;

