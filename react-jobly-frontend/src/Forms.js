import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button } from "reactstrap";
import InputField from "./InputField";
import { login } from "./helpers/auth";
import { handleSubmit } from "./helpers/formHandlers";
import { AuthContext } from './helpers/AuthContext';
import JoblyApi from './helpers/api'; // Import your API module

function Forms({ fields }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const { setAuthenticated } = useContext(AuthContext);
  const { user } = useParams(); // Get the username from the route parameters

  useEffect(() => {
    if (fields[0].formType === "profile") {

      // Call the API and populate the form fields with user data
      JoblyApi.getUser(user)
        .then((userData) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...fields.reduce((obj, input) => {
              obj[input.name] = userData[input.name] || "";
              return obj;
            }, {}),
          }));
        })
        .catch((error) => {
          setErrors(error.toString());
        });
    } else {
      // Initialize the form fields with empty values
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...fields.reduce((obj, input) => {
          obj[input.name] = "";
          return obj;
        }, {}),
      }));
    }
  }, []);

  useEffect(() => {
  }, [formData]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formType = fields[0].formType;
      const token = await handleSubmit(formData, formType, login, history);
      setAuthenticated(token);
    } catch (error) {
      setErrors(error.toString());
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const formTitle = fields[0].formType
    .replace(/-/g, " ")
    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      {errors && <div className="alert alert-danger">{errors}</div>}
      
      <Form onSubmit={onSubmit}>
      <h1>{formTitle}</h1>
        {fields.map((input) => (
          <InputField
            key={input.name}
            label={input.label}
            type={input.type}
            name={input.name}
            value={formData[input.name]}
            onChange={handleChange}
          />
        ))}
        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
}

export default Forms;