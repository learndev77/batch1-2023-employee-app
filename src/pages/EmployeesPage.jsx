import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import { Add } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import * as employeeService from "../services/employees";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    employeeService.fetchEmployees().then((response) => {
      // console.log(response.data);
      setEmployees(response.data);
    });
  }, []);

  const handleDeleteEmployee = async (id) => {
    const employeesCopy = [...employees];
    try {
      const response = await employeeService.deleteEmployee(id);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.log(error);
      // setEmployees(employeesCopy);
      // Expected error
      // 404 - Not Found
      // 400 - Bad Request
      if (error.response && error.response.status === 400) {
        // alert("Data might have already been deleted");
        alert(error.response.data.message[0]);
      }

      // Unexpected error
      // Network is down
      // Server is down
      // Database is down
      // Bugs
      console.log(error);
    }
  };

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
          onDeleteEmployee={handleDeleteEmployee}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeesPage;
