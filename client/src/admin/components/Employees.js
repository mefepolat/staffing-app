import React, { useEffect, useState } from "react";
import { getEmployees } from "../../utils/getEmployees";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function getEmployee() {
      setEmployees(await getEmployees());
    }
    getEmployee();
  }, []);
  console.log(employees);
  return (
    <div className="px-3">
      <table className="table caption-top bg-white rounded">
        <caption className="text-white fs-4">Employees</caption>
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.email}</td>
              </tr>
            );
          })}
         
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
