import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import { Container, Input, Button, Row, Col } from "reactstrap";
import Items from "./Items";
import JoblyApi from "./helpers/api";
import formatHeading from "./helpers/formatHeading";

const List = ({ listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchListItems = async () => {
      let list = [];
      if (listType === "companies") list = await JoblyApi.fetchCompanies();
      if (listType === "jobs") list = await JoblyApi.fetchJobs();
      if (listType === "company") {
        const handle = history.location.pathname.substring('/companies/'.length);
        list = await JoblyApi.getCompany(handle);
      }
      setListItems(list);
      setFilteredItems(list); // Set filteredItems to contain all items initially
    };

    fetchListItems();
  }, [listType, history.location.pathname]);

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
        <Col xs="12" sm="auto" md="8" lg="6">
          <Items items={filteredItems} listType={listType} />
        </Col>
      </Row>
    </Container>
  );
};

export default List;
