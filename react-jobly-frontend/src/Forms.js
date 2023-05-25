import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "reactstrap";
import InputField from "./InputField";
import { login } from "./helpers/auth";
import { handleSubmit } from "./helpers/formHandlers";
import { AuthContext } from './helpers/AuthContext';

function Forms({ fields }) {
  const [formData, setFormData] = useState(
    fields.reduce(
      (obj, input) => ({
        ...obj,
        [input.name]: "",
      }),
      {}
    )
  );

  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const { setAuthenticated } = useContext(AuthContext);

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