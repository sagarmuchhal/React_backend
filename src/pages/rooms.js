import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Header from './/header';

const Room = () => {
  const [formData, setFormData] = useState({
    category: '',
    price: '',
    size: '',
    capacity: '',
    bed: '',
    service: '',
    img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      img: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('size', formData.size);
    formDataToSend.append('capacity', formData.capacity);
    formDataToSend.append('bed', formData.bed);
    formDataToSend.append('service', formData.service);
    formDataToSend.append('img', formData.img);

    try {
      const response = await axios.post('http://localhost:4000/room_category', formDataToSend);
      console.log(response.data);
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error adding room category:', error);
      // Handle error
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: '50%' }}
              required
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={{ width: '50%' }}
              required
            />
          </Form.Group>

          <Form.Group controlId="size">
            <Form.Label>Size:</Form.Label>
            <Form.Control
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              style={{ width: '50%' }}
              required
            />
          </Form.Group>

          <Form.Group controlId="capacity">
            <Form.Label>Capacity:</Form.Label>
            <Form.Control
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              style={{ width: '50%' }}
              required
            />
          </Form.Group>

          <Form.Group controlId="bed">
            <Form.Label>Bed:</Form.Label>
            <Form.Control
              type="text"
              name="bed"
              value={formData.bed}
              onChange={handleChange}
              style={{ width: '50%' }}
              required
            />
          </Form.Group>

          <Form.Group controlId="service">
            <Form.Label>Service:</Form.Label>
            <Form.Control
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              style={{ width: '50%' }}
              required
            />
          </Form.Group>

          <Form.Group controlId="img">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" name="img" onChange={handleImageChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Room Category
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Room;
