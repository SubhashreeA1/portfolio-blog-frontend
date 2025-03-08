import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: "", author: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/blogs", formData);
    navigate("/admin");
  };

  return (
    <Container className="mt-4">
      <h2>Create Blog Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={5} name="content" value={formData.content} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Create Blog</Button>
      </Form>
    </Container>
  );
};

export default CreateBlog;
