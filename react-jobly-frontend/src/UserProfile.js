import React, { useState, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import JoblyApi from "./helpers/api";

function UserProfile() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const username = localStorage.getItem("username");
      const response = await JoblyApi.getUser(username);
      setUser(response);
    };
    getUser();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the necessary actions with the updated user data
    // e.g., make an API request to update the user profile
    // JoblyApi.updateUser(user);
    console.log("Updated user:", user);
  };

  return (
    <Container className="text-center mt-4 col-md-6">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default UserProfile;
