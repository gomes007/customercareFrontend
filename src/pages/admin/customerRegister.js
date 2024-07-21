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
      </RegisterCard>

    </>
  );
};
export default CustomerRegister;
