import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const Items = ({ items, listType }) => {
  const renderListItems = () => {
    switch (listType) {
      case "companies":
        return items.map((company) => (
          <ListGroupItem key={company.handle}>
            <h5>{company.name}</h5>
            <p>{company.description}</p>
          </ListGroupItem>
        ));
      case "jobs":
        return items.map((job) => (
          <ListGroupItem key={job.id}>
            <h5>{job.title}</h5>
            <p>Salary: {job.salary}</p>
          </ListGroupItem>
        ));
      case "applications":
        return items.map((application) => (
          <ListGroupItem key={`${application.username}-${application.job_id}`}>
            <h5>{application.job_title}</h5>
            <p>Applicant: {application.username}</p>
          </ListGroupItem>
        ));
      case "users":
        return items.map((user) => (
          <ListGroupItem key={user.username}>
            <h5>{user.username}</h5>
            <p>{user.email}</p>
          </ListGroupItem>
        ));
      default:
        return null;
    }
  };

  return <ListGroup className="mt-4">{renderListItems()}</ListGroup>;
};

export default Items;