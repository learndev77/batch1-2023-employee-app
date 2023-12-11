import logo from "./logo.svg";
import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import EmployeesTable from "./components/EmployeesTable";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import { EMPLOYEES_DATA } from "./data/employees";
import { useEffect, useState } from "react";
import EmployeesPage from "./pages/EmployeesPage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";
import http from "./services/http";
import * as employeeService from "./services/employees";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import * as authService from "./services/auth";
import Navbar from "./components/Navbar";

function App() {
  // const handleDeleteEmployee = (id) => {
  //   setEmployees(employees.filter((employee) => employee.id !== id));
  // };

  // const handleAddEmployee = (employee) => {
  //   setEmployees([
  //     ...employees,
  //     { ...employee, id: employees.length * 999 + 1 },
  //   ]);
  // };

  // const handleEditEmployee = (id, employee) => {
  //   setEmployees(
  //     employees.map((emp) => {
  //       if (emp.id === id) {
  //         return {
  //           ...employee,
  //           id,
  //         };
  //       }
  //       return emp;
  //     })
  //   );
  // };

  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(authService.getAccessToken());

  const handleLogin = async (employee, password) => {
    try {
      const response = await authService.login(employee, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      console.log(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.statusCode === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = async () => {
    authService.logout();
    setAccessToken(null);
    navigate("/");
  };

  return (
    <>
      <CssBaseline />
      <Navbar onLogout={handleLogout} />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />

          <Route
            path="/employees"
            element={accessToken ? <EmployeesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/employees/:id"
            element={
              accessToken ? <EmployeeDetailsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/employees/new"
            element={
              accessToken ? <AddEmployeePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/employees/:id/edit"
            element={
              accessToken ? <EditEmployeePage /> : <Navigate to="/login" />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
