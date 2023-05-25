import React, { useState, useEffect } from "react";
import { Container, Input } from "reactstrap";
import Items from "./Items"; // Import the Items component
import JoblyApi from "./helpers/api";

const List = ({ listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const fetchListItems = async () => {
      let list = [];
      if (listType === "companies") list = await JoblyApi.fetchCompanies();
      if (listType === "jobs") list = await JoblyApi.fetchJobs();
      setListItems(list);
    };

    fetchListItems();
  }, [listType]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = listItems.filter((item) => {
    // Get an array of property values from the item object
    const itemValues = Object.values(item);
  
    // Check if any of the property values contain the searchTerm
    return itemValues.some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Container className="text-center mt-4">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Items items={filteredItems} listType={listType} />
    </Container>
  );
};

export default List;
