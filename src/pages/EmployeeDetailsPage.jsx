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
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeeDetailsPage = ({ employees, onDeleteEmployee }) => {
  const params = useParams();
  const navigate = useNavigate();

  const employee = employees.find((employee) => employee.id === +params.id);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };

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
          <MenuItem onClick={() => navigate(`/employees/${employee.id}/edit`)}>
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
};

export default EmployeeDetailsPage;
