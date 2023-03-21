import React, { useEffect, useState } from "react";
import { getEmployees } from "../../utils/getEmployees";
import { updateEmployee } from "../../utils/updateEmployee";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editMode, setEditMode] = useState({});

  const handleSave = async (e, id) => {
    e.preventDefault();
    const { phoneNumber, email } = employees.find(
      (employee) => employee._id === id
    );
    try {
      await updateEmployee(id, phoneNumber, email);
      setEditMode({ ...editMode, [id]: false });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleEditMode = (id) => {
    setEditMode({ ...editMode, [id]: !editMode[id] });
  };

  const handleInputChange = async (e, id) => {
    const { name, value } = e.target;

    const updatedEmployees = employees.map((employee) => {
      if (employee._id === id) {
        return { ...employee, [name]: value };
      } else {
        return employee;
      }
    });
    setEmployees(updatedEmployees)
  };

  const handleCancel = (id) => {
    setEditMode({ ...editMode, [id]: false });
  };

  useEffect(() => {
    async function getEmployee() {
      setEmployees(await getEmployees());
    }
    getEmployee();
  }, []);

  return (
    <div className="px-3">
      <table className="table caption-top bg-white rounded">
        <caption className="text-white fs-4">Employees</caption>
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Seniority</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const { _id, firstName, lastName, phoneNumber, email, seniority } = employee;
            const isInEditMode = editMode[_id];
            return (
              <tr key={_id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{seniority}</td>
                {isInEditMode ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => handleInputChange(e, _id)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => handleInputChange(e, _id)}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{phoneNumber}</td>
                    <td>{email}</td>
                  </>
                )}
                <td>
                  {isInEditMode ? (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={(e) => handleSave(e, _id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(_id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => toggleEditMode(_id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
