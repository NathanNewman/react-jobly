import React, { useState, useContext, useEffect } from "react";
import {
  ListGroup,
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

const Items = ({ items, listType }) => {
  const [itemsList, setItemsList] = useState(items); // Use the useState hook correctly
  const { username } = useContext(AuthContext);

  useEffect(() => {
    setItemsList(items);
  }, [items]);

  async function handleApply(jobId) {
    await JoblyApi.applyToJob(username, jobId);
    const updatedItems = itemsList.map((item) => {
      if (item.id === jobId) {
        return { ...item, applied: true };
      }
      return item;
    });
    setItemsList(updatedItems);
  }

  async function handleUnapply(jobId) {
    await JoblyApi.unapplyToJob(username, jobId);
    const updatedItems = itemsList.map((item) => {
      if (item.id === jobId) {
        return { ...item, applied: false };
      }
      return item;
    });
    setItemsList(updatedItems);
  }

  const renderListItems = () => {
    if (!itemsList) {
      return null;
    }

    switch (listType) {
      case "companies":
        return itemsList.map((company) => (
          <ListGroupItem key={uuidv4()}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="mr-3">
                    <img
                      src={company.logo_url}
                      alt={company.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <CardTitle tag="h5">{company.name}</CardTitle>
                    <CardText>{company.description}</CardText>
                  </div>
                </div>
              </CardBody>
              <Link
                to={`/companies/${company.handle}`}
                className="stretched-link"
              />
            </Card>
          </ListGroupItem>
        ));
      case "jobs":
        return itemsList.map((job) => (
          <ListGroupItem key={uuidv4()}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="mr-3">
                    <Button
                      color={job.applied ? "danger" : "primary"}
                      onClick={() =>
                        job.applied ? handleUnapply(job.id) : handleApply(job.id)
                      }
                    >
                      {job.applied ? "Unapply" : "Apply"}
                    </Button>
                  </div>
                  <div className="flex-grow-1">
                    <CardTitle tag="h5">{job.title}</CardTitle>
                    <CardText>Salary: {job.salary}</CardText>
                    <CardText>Equity: {job.equity}</CardText>
                    <CardText>Company: {job.companyName}</CardText>
                  </div>
                </div>
              </CardBody>
            </Card>
          </ListGroupItem>
        ));
      default:
        return null;
    }
  };

  return <ListGroup className="mt-4">{renderListItems()}</ListGroup>;
};

export default Items;
