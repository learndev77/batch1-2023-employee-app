import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";

const EditEmployeePage = ({ onEditEmployee, employees }) => {
  const params = useParams();
  const { id, ...employee } = employees.find(
    (employee) => employee.id === +params.id
  );
  return (
    <div>
      <EmployeeForm
        onSubmit={(form) => onEditEmployee(id, form)}
        initialValue={employee}
      />
    </div>
  );
};

export default EditEmployeePage;
