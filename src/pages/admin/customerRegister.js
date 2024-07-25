import AddressForm from "@/components/employee/AddressForm";
import FieldForm from "@/components/form/FieldForm";
import RegisterCard from "@/components/form/RegisterCard";
import NavTitle from "@/components/menu/NavTitle";
import customerService from "@/service/customerService";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";


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
    gender: null,
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

  const handleAddOrEditAddress = () => {
    setCustomer((prevData) => ({
      ...prevData,
      addresses: [...prevData.addresses, { ...currentAddress }],
    }));
    setCurrentAddress({
      street: "",
      number: "",
      neighborhood: "",
      zipCode: "",
      complement: "",
      city: "",
      state: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerService.createCustomer(customer);
      toast.success("Customer created successfully");
      console.log(customer);
    } catch (error) {
      console.log(customer);
      console.error("Error creating customer:", error);
      toast.error("Failed to create customer");
    }
  }



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
      <RegisterCard handleSubmit={handleSubmit}>
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
                  value={type.toUpperCase()} 
                  checked={customer.customerType === type.toUpperCase()} 
                  onChange={handleChange}
                />
                <label className="form-check-label form-label small" htmlFor={`flexRadioDefault${type}`}>
                  {type}
                </label>
              </div>
            ))}
          </div>



        </div>


        {customer.customerType === 'INDIVIDUAL' && (
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

        {customer.customerType === 'CORPORATE' && (
          <>
            <div className="row mt-2">
              <div className="col-md-5">
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
              <div className="col-md-4">
                <FieldForm
                  label="Corporate Email"
                  type="text"
                  name="corporateEmail"
                  value={customer.corporateEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}


        <div className="row mt-2">
          <div className="col-md-6">
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
          <div className="col-md-3">
            <FieldForm
              label="Situation"
              type="select"
              id="situation"
              name="situation"
              value={customer.situation}
              onChange={handleChange}
              options={[
                { value: "ACTIVE", label: "Active" },
                { value: "INACTIVE", label: "Inactive" },
              ]}
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
        </div>


        <legend>Address Information</legend>
        <div className="mt-3">
          {customer.addresses.map((address, index) => (
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
          <Button onClick={handleAddOrEditAddress} className="mb-3" size="sm" title="Add Address">
            <i className="bi bi-house-add"></i>
          </Button>
        </div>
      </RegisterCard>
    </>
  );
}

export default CustomerRegister;
