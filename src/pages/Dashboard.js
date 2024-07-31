// src/components/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement
);

export const Dashboard = () => {
  // Sample data
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
        fill: false,
        borderColor: '#007bff',
        tension: 0.1
      }
    ]
  };

  const barChartData = {
    labels: ['Account A', 'Account B', 'Account C', 'Account D'],
    datasets: [
      {
        label: 'Account Balances',
        data: [3000, 2500, 1500, 2000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieChartData = {
    labels: ['Tax', 'Investment', 'Savings'],
    datasets: [
      {
        label: 'Expenses Distribution',
        data: [40, 30, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1
      }
    ]
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={12}>
          <h2>Dashboard</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>Monthly Revenue</Card.Header>
            <Card.Body>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Account Balances</Card.Header>
            <Card.Body>
              <Bar data={barChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header>Expenses Distribution</Card.Header>
            <Card.Body>
              <Pie data={pieChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

