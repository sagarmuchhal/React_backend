import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import Header from './/header';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [formData, setFormData] = useState({
    event_name: '',
    event_btn: '',
    event_date: '',
    img: null,
  });
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/view_blog');
        setBlogData(response.data);
      } catch (error) {
        console.error(
          'Error fetching blog data:',
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'img' ? files[0] : value,
    }));
  };

  const clearFormData = () => {
    setFormData({
      event_name: '',
      event_btn: '',
      event_date: '',
      img: null,
    });
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      event_name: blog.event_name,
      event_btn: blog.event_btn,
      event_date: blog.event_date,
      img: blog.img,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete_blog/${id}`);
      const updatedData = await axios.get('http://localhost:4000/view_blog');
      setBlogData(updatedData.data);
    } catch (error) {
      console.error(
        'Error deleting blog:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('event_name', formData.event_name);
    data.append('event_btn', formData.event_btn);
    data.append('event_date', formData.event_date);

    if (formData.img) {
      data.append('img', formData.img);
    }

    try {
      let response;

      if (selectedBlog) {
        response = await axios.put(
          `http://localhost:4000/update_blog/${selectedBlog.id}`,
          data
        );
        setSelectedBlog(null);
        setBlogData((prevBlogData) =>
          prevBlogData.map((blog) =>
            blog.id === selectedBlog.id ? response.data : blog
          )
        );
      } else {
        response = await axios.post('http://localhost:4000/add_blog', data);
        setBlogData((prevBlogData) => [...prevBlogData, response.data]);
      }

      clearFormData();
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
    }
  };
  

  return (
    <div>
      <Header />
      <Container>
        <h2 className="mt-4">Add Blog</h2>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="event_name">
                <Form.Label>Event Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="event_name"
                  onChange={handleInputChange}
                  value={formData.event_name}
                  required
                />
              </Form.Group>
              <Form.Group controlId="event_btn">
                <Form.Label>Event Button:</Form.Label>
                <Form.Control
                  type="text"
                  name="event_btn"
                  onChange={handleInputChange}
                  value={formData.event_btn}
                  required
                />
              </Form.Group>
              <Form.Group controlId="event_date">
                <Form.Label>Event Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="event_date"
                  onChange={handleInputChange}
                  value={formData.event_date}
                  required
                />
              </Form.Group>
              <Form.Group controlId="img">
                <Form.Label>Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                <br />
              </Form.Group>
              <Button variant="primary" type="submit">
                {selectedBlog ? 'Update Blog' : 'Add Blog'}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex flex-column align-items-center">
            <h2 className="mt-4">Blog Data</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Event Button</th>
                  <th>Event Date</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {blogData.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.event_name}</td>
                    <td>{blog.event_btn}</td>
                    <td>{blog.event_date}</td>
                    <td>
                      <div
                        className="blog-item set-bg"
                        style={{
                          background: `url(http://localhost:4000/uploads/${blog.img}) center/cover no-repeat`,
                          maxWidth: '60px',
                          borderRadius: '10%',
                          height: '60px',
                        }}
                      />
                    </td>
                    <td>
                      <Button variant="warning" onClick={() => handleEdit(blog)}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(blog.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Blog;
