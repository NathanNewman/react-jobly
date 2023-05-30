import React, { useState } from "react";
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

const Items = ({ items, listType }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (jobId) => {
    if (appliedJobs.includes(jobId)) {
      setAppliedJobs(appliedJobs.filter((id) => id !== jobId));
    } else {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  const isJobApplied = (jobId) => {
    return appliedJobs.includes(jobId);
  };
  const renderListItems = () => {
    switch (listType) {
      case "companies":
        return items.map((company) => (
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
        return items.map((job) => (
          <ListGroupItem key={uuidv4()}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="mr-3">
                    <Button
                      color={isJobApplied(job.id) ? "danger" : "primary"}
                      onClick={() => handleApply(job.id)}
                    >
                      {isJobApplied(job.id) ? "Unapply" : "Apply"}
                    </Button>
                  </div>
                  <div className="flex-grow-1">
                    <CardTitle tag="h5">{job.title}</CardTitle>
                    <CardText>Salary: {job.salary}</CardText>
                    <CardText>Equity: {job.equity}</CardText>
                  </div>
                </div>
              </CardBody>
            </Card>
          </ListGroupItem>
        ));
      case "applications":
        return items.map((application) => (
          <ListGroupItem key={`${application.username}-${application.job_id}`}>
            <Card>
              <CardBody>
                <CardTitle tag="h5">{application.job_title}</CardTitle>
                <CardText>Applicant: {application.username}</CardText>
              </CardBody>
            </Card>
          </ListGroupItem>
        ));
        case "company":
          return items.jobs.map((job) => (
            <ListGroupItem key={uuidv4()}>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">{job.title}</CardTitle>
                  <CardText>Salary: {job.salary}</CardText>
                  <CardText>Equity: {job.equity}</CardText>
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
