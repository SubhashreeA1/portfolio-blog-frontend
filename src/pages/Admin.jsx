import { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../utils/api"; // Import API instance

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs using API instance
  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blogs");
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await API.delete(`/blogs/${id}`);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Admin Panel - Manage Blog Posts</h2>
      <Button variant="success" as={Link} to="/admin/create" className="mb-3">
        + Create New Blog
      </Button>
      {loading ? <Spinner animation="border" /> : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <Button variant="warning" as={Link} to={`/admin/edit/${blog._id}`} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(blog._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Admin;
