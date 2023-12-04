import React, { useState } from "react";
import { EMPLOYEES_DATA } from "../data/employees";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowForward, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const EmployeesTable = ({ employees, onDeleteEmployee }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.name}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.username}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                <Link to={`/employees/${employee.id}`}>
                  <IconButton color="primary">
                    <ArrowForward />
                  </IconButton>
                </Link>
                <Link to={`/employees/${employee.id}/edit`}>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <IconButton
                  color="error"
                  onClick={() => onDeleteEmployee(employee.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
