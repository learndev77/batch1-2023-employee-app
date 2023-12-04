import { Button, Grid } from "@mui/material";
import React from "react";
import EmployeesTable from "../components/EmployeesTable";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EmployeesPage = ({ employees, onDeleteEmployee }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end" textAlign="right">
      <Grid item xs={4}>
        <Button
          variant="text"
          startIcon={<Add />}
          LinkComponent={Link}
          to="/employees/new"
        >
          Add Employee
        </Button>
      </Grid>
      <Grid item xs={12}>
        <EmployeesTable
          employees={employees}
          onDeleteEmployee={onDeleteEmployee}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeesPage;
