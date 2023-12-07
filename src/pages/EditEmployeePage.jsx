import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";
import * as employeeService from "../services/employees";

const EditEmployeePage = ({ onEditEmployee, employees }) => {
  const params = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { id, ...employee } = employees.find(
  //   (employee) => employee.id === +params.id
  // );

  useEffect(() => {
    setLoading(true);
    employeeService.fetchEmployeeById(params.id).then((response) => {
      setEmployee(response.data);
      setLoading(false);
    });
  }, [params.id]);

  const handleSubmit = (form) => {
    employeeService.updateEmployee(employee.id, form).then(() => {
      navigate("/");
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (employee) {
    return (
      <div>
        <EmployeeForm
          onSubmit={(form) => handleSubmit(form)}
          initialValue={{
            name: employee.name,
            username: employee.username,
            email: employee.email,
            phone: employee.phone,
            address: employee.address,
            website: employee.website,
          }}
        />
      </div>
    );
  }
};

export default EditEmployeePage;
