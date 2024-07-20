import FieldForm from "@/components/form/FieldForm";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddressForm from "./AddressForm";

const DependentForm = ({
  dependent,
  handleDependentChange,
  handleAddOrEditDependent,
  dependents,
  handleEditDependent,
  handleRemoveDependent,
}) => {
  const [address, setAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    zipCode: "",
    complement: "",
    city: "",
    state: "",
  });
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (dependent.addresses) {
      setAddresses(dependent.addresses);
    }
  }, [dependent]);

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index][name] = value;
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { ...address }]);
    setAddress({
      street: "",
      number: "",
      neighborhood: "",
      zipCode: "",
      complement: "",
      city: "",
      state: "",
    });
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const handleAddDependent = () => {
    handleAddOrEditDependent({ ...dependent, addresses });
    setAddresses([]);
  };

  return (
    <>
      <div className="row limit">
        <div className="col-md-4">
          <FieldForm
            label="Name"
            type="text"
            name="name"
            value={dependent.name}
            onChange={handleDependentChange}
          />
        </div>
        <div className="col-md-4">
          <FieldForm
            label="Birth Date"
            type="date"
            name="birthDate"
            value={dependent.birthDate}
            onChange={handleDependentChange}
          />
        </div>
        <div className="col-md-4">
          <FieldForm
            label="Gender"
            type="select"
            name="gender"
            value={dependent.gender}
            onChange={handleDependentChange}
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
            ]}
          />
        </div>
        <div className="col-md-4">
          <FieldForm
            label="CPF"
            type="text"
            name="cpf"
            value={dependent.cpf}
            onChange={handleDependentChange}
          />
        </div>
        <div className="col-md-4">
          <FieldForm
            label="Relationship"
            type="select"
            name="relationship"
            value={dependent.relationship}
            onChange={handleDependentChange}
            options={[
              { value: "SPOUSE", label: "Spouse" },
              { value: "SON", label: "Son" },
              { value: "DAUGHTER", label: "Daughter" },
              { value: "FATHER", label: "Father" },
              { value: "MOTHER", label: "Mother" },
            ]}
          />
        </div>
      </div>

      {addresses.map((address, index) => (
        <div key={index} className="address-fieldset">
          <div className="legend-address">Address {index + 1}</div>
          <AddressForm
            index={index}
            address={address}
            handleChange={handleAddressChange}
            handleRemoveAddress={handleRemoveAddress}
          />
        </div>
      ))}
      <Button
        onClick={handleAddAddress}
        className="mb-3 me-2"
        size="sm"
        title="Add Address"
      >
        <i className="bi bi-house-add"></i>
      </Button>
      <Button onClick={handleAddDependent} className="mb-3 me-2" size="sm">
        {dependent && dependent.id ? "Update" : "Add"}
      </Button>

      <div>
        <legend>Current Dependents</legend>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>CPF</th>
              <th>Relationship</th>
              <th>Addresses</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dependents.map((dep, index) => (
              <tr key={index}>
                <td>{dep.name}</td>
                <td>{dep.birthDate}</td>
                <td>{dep.gender}</td>
                <td>{dep.cpf}</td>
                <td>{dep.relationship}</td>
                <td>
                  {dep.addresses.map((addr, addrIndex) => (
                    <div key={addrIndex}>
                      {addr.street}, {addr.number}, {addr.neighborhood},{" "}
                      {addr.zipCode}, {addr.complement}, {addr.city},{" "}
                      {addr.state}
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    onClick={() => handleEditDependent(index)}
                    className="btn btn-warning btn-sm me-2"
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    onClick={() => handleRemoveDependent(index)}
                    className="btn btn-danger btn-sm"
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DependentForm;
