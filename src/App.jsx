import logo from "./logo.svg";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import EmployeesTable from "./components/EmployeesTable";
import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import { EMPLOYEES_DATA } from "./data/employees";
import { useState } from "react";
import EmployeesPage from "./pages/EmployeesPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [employees, setEmployees] = useState(EMPLOYEES_DATA);

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleAddEmployee = (employee) => {
    setEmployees([
      ...employees,
      { ...employee, id: employees.length * 999 + 1 },
    ]);
  };

  const handleEditEmployee = (id, employee) => {
    setEmployees(
      employees.map((emp) => {
        if (emp.id === id) {
          return {
            ...employee,
            id,
          };
        }
        return emp;
      })
    );
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route
            path="/employees"
            element={
              <EmployeesPage
                onDeleteEmployee={handleDeleteEmployee}
                employees={employees}
              />
            }
          />
          <Route
            path="/employees/:id"
            element={
              <EmployeeDetailsPage
                onDeleteEmployee={handleDeleteEmployee}
                employees={employees}
              />
            }
          />
          <Route
            path="/employees/new"
            element={<AddEmployeePage onAddEmployee={handleAddEmployee} />}
          />
          <Route
            path="/employees/:id/edit"
            element={
              <EditEmployeePage
                onEditEmployee={handleEditEmployee}
                employees={employees}
              />
            }
          />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
