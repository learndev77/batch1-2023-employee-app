import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import * as employeeService from "../services/employees";
import { useNavigate } from "react-router-dom";

const AddEmployeePage = ({ onAddEmployee }) => {
  const navigate = useNavigate();

  const handleSubmit = async (employee) => {
    console.log("hs", employee);
    // employeeService.addEmployee(employee).then(response => {
    //   console.log(response)
    // }).catch(error => {

    // })

    try {
      const response = await employeeService.addEmployee(employee);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // alert("Data might have already been deleted");
        alert(error.response.data.message[0]);
      }
      console.log(error);
    }
  };

  return (
    <div>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEmployeePage;
