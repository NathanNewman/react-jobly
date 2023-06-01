import React, { useState, useContext, useEffect } from "react";
import {
  ListGroupItem,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import JoblyApi from "./helpers/api";
import { AuthContext } from "./helpers/AuthContext";

const Item = ({ item, listType }) => {
  const [isApplied, setIsApplied] = useState(item.applied);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    setIsApplied(item.applied);
  }, [item.applied]);

  async function handleApply() {
    await JoblyApi.applyToJob(username, item.id);
    setIsApplied(true);
  }

  async function handleUnapply() {
    await JoblyApi.unapplyToJob(username, item.id);
    setIsApplied(false);
  }

  return (
    <ListGroupItem key={uuidv4()}>
      <Card>
        <CardBody>
          <div className="d-flex">
            {listType === "jobs" && (
              <div className="mr-3">
                <Button
                  color={isApplied ? "danger" : "primary"}
                  onClick={isApplied ? handleUnapply : handleApply}
                >
                  {isApplied ? "Unapply" : "Apply"}
                </Button>
              </div>
            )}
            <div className="flex-grow-1">
              <CardTitle tag="h5">{item.title || item.name}</CardTitle>
              {listType === "jobs" && (
                <>
                  <CardText>Salary: {item.salary}</CardText>
                  <CardText>Equity: {item.equity}</CardText>
                  <CardText>Company: {item.companyName}</CardText>
                </>
              )}
              {listType === "companies" && (
                <>
                  <img
                    src={item.logo_url}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <CardText>{item.description}</CardText>
                </>
              )}
            </div>
          </div>
        </CardBody>
        {listType === "companies" && (
          <Link to={`/companies/${item.handle}`} className="stretched-link" />
        )}
      </Card>
    </ListGroupItem>
  );
};

export default Item;