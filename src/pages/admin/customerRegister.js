import FieldForm from "@/components/form/FieldForm";
import RegisterCard from "@/components/form/RegisterCard";
import NavTitle from "@/components/menu/NavTitle";
import { useState } from "react";


const CustomerRegister = () => {

  const [customer, setCustomer] = useState({
    contractNumber: "",
    contractDate: "",
    corporateEmail: "",
    cnpj: "",
    tradeName: "",
    situation: "",
    customerType: "",
    name: "",
    privateEmail: "",
    cpf: "",
    phone: "",
    birthDate: "",
    addresses: [],
    gender: "",
    otherInformation: ""
  });

  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    number: "",
    neighborhood: "",
    zipCode: "",
    complement: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...customer.addresses];
    updatedAddresses[index][name] = value;
    setCustomer((prevData) => ({ ...prevData, addresses: updatedAddresses }));
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = customer.addresses.filter((_, i) => i !== index);
    setCustomer((prevData) => ({ ...prevData, addresses: updatedAddresses }));
  };



  return (
    <>
      <NavTitle
        icon={<i className="bi bi-people"></i>
        }
        title="Customer"
        path={[
          { name: "Home", link: "/" },
          { name: "Customers", link: "/admin/customerRegister" },
          { name: "Customer List", link: "" },
        ]}
      />
      <RegisterCard>
        <legend>Customer Information</legend>
        <div className="d-flex">
          <div className="radio-format">
            <div className="legend">Customer Type</div>
            {["Individual", "Corporate"].map((type) => (
              <div key={type} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="customerType"
                  id={`flexRadioDefault${type}`}
                  value={type}
                  checked={customer.customerType === type}
                  onChange={handleChange}
                />
                <label className="form-check-label form-label small" htmlFor={`flexRadioDefault${type}`}>
                  {type}
                </label>
              </div>
            ))}
          </div>

          <div className="radio-format">
            <div className="legend">Situation</div>
            {["Active", "Inactive"].map((type) => (
              <div key={type} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="situation"
                  id={`flexRadioDefault${type}`}
                  value={type}
                  checked={customer.situation === type}
                  onChange={handleChange}
                />
                <label className="form-check-label form-label small" htmlFor={`flexRadioDefault${type}`}>
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>


        {customer.customerType === 'Individual' && (
          <>
            <div className="row mt-2">
              <div className="col-md-6">
                <FieldForm
                  label="Name"
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <FieldForm
                  label="Private Email"
                  type="text"
                  name="privateEmail"
                  value={customer.privateEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <FieldForm
                  label="Gender"
                  type="select"
                  id="gender"
                  name="gender"
                  value={customer.gender}
                  onChange={handleChange}
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                  ]}
                />
              </div>
              <div className="col-md-3">
                <FieldForm
                  label="CPF"
                  type="text"
                  name="cpf"
                  value={customer.cpf}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <FieldForm
                  label="Birth Date"
                  type="date"
                  name="birthDate"
                  value={customer.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <FieldForm
                  label="Phone"
                  type="number"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {customer.customerType === 'Corporate' && (
          <>
            <div className="col-md-6">
              <FieldForm
                label="Trade Name"
                type="text"
                name="tradeName"
                value={customer.tradeName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <FieldForm
                label="CNPJ"
                type="text"
                name="cnpj"
                value={customer.cnpj}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <FieldForm
                label="Contract Number"
                type="text"
                name="contractNumber"
                value={customer.contractNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <FieldForm
                label="Contract Date"
                type="date"
                name="contractDate"
                value={customer.contractDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <FieldForm
                label="Corporate Email"
                type="text"
                name="corporateEmail"
                value={customer.corporateEmail}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mt-3">
              <FieldForm
                label="Other Information"
                type="textarea"
                name="otherInformation"
                rows={3}
                value={customer.otherInformation}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </RegisterCard>
    </>
  );
}

export default CustomerRegister;
