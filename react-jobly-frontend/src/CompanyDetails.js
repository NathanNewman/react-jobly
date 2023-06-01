import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Input, Button, Row, Col } from "reactstrap";
import Lists from "./Lists";
import JoblyApi from "./helpers/api";
import formatHeading from "./helpers/formatHeading";

function CompanyDetails() {
  const [company, setCompany] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const handle = history.location.pathname.substring("/companies/".length);
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    fetchData();
  }, [history.location.pathname]);

  const headingText = formatHeading(history);

  return (
    <Container className="text-center mt-4">
      <h1>{headingText}</h1>
      <img src={company.logo_url}></img>
      <p>{company.description}</p>
      <p>Employees: {company.num_employees}</p>
      <Row className="justify-content-center">
        <Lists listType="company" />
      </Row>
    </Container>
  );
}

export default CompanyDetails;
