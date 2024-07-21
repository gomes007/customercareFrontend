import FieldForm from "@/components/form/FieldForm";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Exemplo = () => {
  const [employees, setEmployees] = useState([
    { name: "", phone: "" }
  ]);

  const handleEmployeeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEmployees = [...employees];
    updatedEmployees[index][name] = value;
    setEmployees(updatedEmployees);
  };

  const handleDuplicateEmployee = () => {
    const newEmployee = { name: "", phone: "" };
    setEmployees([...employees, newEmployee]);
  };

  const handleRemoveEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  }

  return (
    <>
      {employees.map((employee, index) => (
        <div className="row mb-3" key={index}>
          <div className="col-md-4">
            <FieldForm
              label="Name"
              type="text"
              name="name"
              value={employee.name}
              onChange={(e) => handleEmployeeChange(index, e)}
            />
          </div>
          <div className="col-md-4">
            <FieldForm
              label="Phone"
              type="text"
              name="phone"
              value={employee.phone}
              onChange={(e) => handleEmployeeChange(index, e)}
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <Button
              variant="primary"
              onClick={() => handleDuplicateEmployee(index)}
            >
              Duplicar
            </Button>
            <Button
              variant="danger"
              onClick={() => handleRemoveEmployee(index)}
            >
              Remover
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Exemplo;
