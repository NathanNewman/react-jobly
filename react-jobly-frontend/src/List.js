import React, { useState, useEffect } from "react";
import { Container, Input } from "reactstrap";
import { useLocation } from "react-router-dom";
import Items from "./Items"; // Import the Items component

const List = ({ fetchData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const fetchListItems = async () => {
      const list = await fetchData();
      setListItems(list);
    };

    fetchListItems();
  }, [fetchData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const location = useLocation();
  const listType = location.pathname.slice(1); // Remove the leading "/"

  const filteredItems = listItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="text-center mt-4">
      <Input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      <Items items={filteredItems} listType={listType} />
    </Container>
  );
};

export default List;