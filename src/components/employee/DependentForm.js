import FieldForm from "@/components/form/FieldForm";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddressForm from './AddressForm';

const DependentForm = ({ dependent, handleDependentChange, handleAddOrEditDependent, dependents, handleRemoveDependent }) => {
  const [address, setAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    zipCode: "",
    complement: "",
    city: "",
    state: ""
  });
  const [addresses, setAddresses] = useState([]);

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
      state: ""
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
      <div className="row">
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
              { value: 'MALE', label: 'Male' },
              { value: 'FEMALE', label: 'Female' }
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
              { value: 'SPOUSE', label: 'Spouse' },
              { value: 'CHILD', label: 'Child' },
              { value: 'DAUGHTER', label: 'Daughter' },
              { value: 'FATHER', label: 'Father' },
              { value: 'MOTHER', label: 'Mother' }
            ]}
          />
        </div>
      </div>
      <legend>Dependent Address</legend>
      {addresses.map((address, index) => (
        <AddressForm
          key={index}
          index={index}
          address={address}
          handleChange={handleAddressChange}
          handleRemoveAddress={handleRemoveAddress}
        />
      ))}
      <Button onClick={handleAddAddress} className="mb-3">Add Address</Button>
      <Button onClick={handleAddDependent}>Add Dependent</Button>
      <div>
        <h2>Current Dependents</h2>
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
                      {addr.street}, {addr.number}, {addr.neighborhood}, {addr.zipCode}, {addr.complement}, {addr.city}, {addr.state}
                    </div>
                  ))}
                </td>
                <td>
                  <Button onClick={() => handleRemoveDependent(index)}>Delete</Button>
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
