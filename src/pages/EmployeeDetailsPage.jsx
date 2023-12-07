import { MoreVert } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as employeeService from "../services/employees";

const EmployeeDetailsPage = ({ employees, onDeleteEmployee }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  // const employee = employees.find((employee) => employee.id === +params.id);

  useEffect(() => {
    setLoading(true);
    employeeService.fetchEmployeeById(params.id).then((response) => {
      setEmployee(response.data);
      setLoading(false);
      console.log(response.data);
    });

    // return () => {
    //   console.log("details unmounting");
    // };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (employee) {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          }
          title={employee.name}
          subheader={`@${employee.username}`}
        />
        <CardContent>
          <Menu
            id="basic-menu"
            anchor={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={() => navigate(`/employees/${employee.id}/edit`)}
            >
              Edit
            </MenuItem>
            {/* <Link to={`/employees/${employee.id}/edit`}>Edit</Link> */}
            <MenuItem
              onClick={() => {
                onDeleteEmployee(employee.id);
                navigate("/");
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Typography variant="overline">Email</Typography>
              <Typography variant="body2">{employee.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Phone</Typography>
              <Typography variant="body2">{employee.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Address</Typography>
              <Typography variant="body2">{employee.address}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Website</Typography>
              <Typography variant="body2">{employee.website}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
};

export default EmployeeDetailsPage;
