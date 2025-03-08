import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://portfolio-blog-backend-xour.onrender.com/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      setAuth(true);
      navigate("/admin");
    } catch (error) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Admin Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
