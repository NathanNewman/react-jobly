import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Input, Button, Row, Col } from "reactstrap";
import Item from "./Item";
import JoblyApi from "./helpers/api";
import formatHeading from "./helpers/formatHeading";
import { AuthContext } from "./helpers/AuthContext";

const Lists = ({ listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const { username } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchListItems = async () => {
      if (listType === "companies") {
        const companies = await JoblyApi.fetchCompanies();
        setListItems(companies);
        setFilteredItems(companies);
      }
      if (listType === "jobs") {
        const jobs = await JoblyApi.fetchJobs(username);
        console.log(jobs);

        setListItems(jobs);
        setFilteredItems(jobs);
      }
      if (listType === "company") {
        const handle = history.location.pathname.substring(
          "/companies/".length
        );
        const company = await JoblyApi.getCompany(handle);
        setListItems(company);
        setFilteredItems(company);
      }
    };

    fetchListItems();
  }, [listType, history.location.pathname, username]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm) {
      // If search term is null, display all items
      setFilteredItems(listItems);
    } else {
      const filteredItems = listItems.filter((item) => {
        const itemValues = Object.values(item);
        return itemValues.some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredItems(filteredItems);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredItems(listItems);
  };

  const headingText = formatHeading(history);

  const spinner = (
    <div>
      <h1>Nothing to see here!</h1>
      <h1>Nothing to see here!</h1>
      <h1>Nothing to see here!</h1>
      <h1>Nothing to see here!</h1>
      <h1>Nothing to see here!</h1>
    </div>
  );

  const listOfItems = (
    <Col xs="12" sm="auto" md="8" lg="6">
      {filteredItems.map((item) => (
        <Item key={item.id} item={item} listType={listType} />
      ))}
    </Col>
  );

  return (
    <Container className="text-center mt-4">
      <h1>{headingText}</h1>
      <Row className="justify-content-center">
        <Col xs="12" sm="auto" md="6" lg="4">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="mb-2"
                  bsSize="md"
                />
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <Button type="submit" color="primary" className="mr-2">
                  Search
                </Button>
                <Button type="button" color="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {filteredItems.length > 0 ? listOfItems : spinner}
      </Row>
    </Container>
  );
};

export default Lists;