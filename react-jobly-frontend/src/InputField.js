import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

function InputField({ label, type, name, value, onChange }) {
  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        value={value || ""}
        onChange={onChange}
      />
    </FormGroup>
  );
}

export default InputField;
