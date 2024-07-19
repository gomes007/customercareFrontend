import React from 'react';
import FieldForm from "@/components/form/FieldForm";
import { Button } from 'react-bootstrap';

const AddressForm = ({ index, address, handleChange, handleRemoveAddress }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <FieldForm
          label="Street"
          type="text"
          name="street"
          value={address.street}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-2">
        <FieldForm
          label="Number"
          type="text"
          name="number"
          value={address.number}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-4">
        <FieldForm
          label="Neighborhood"
          type="text"
          name="neighborhood"
          value={address.neighborhood}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-4">
        <FieldForm
          label="Zip Code"
          type="text"
          name="zipCode"
          value={address.zipCode}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-4">
        <FieldForm
          label="Complement"
          type="text"
          name="complement"
          value={address.complement}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-4">
        <FieldForm
          label="City"
          type="text"
          name="city"
          value={address.city}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-4">
        <FieldForm
          label="State"
          type="text"
          name="state"
          value={address.state}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-4 d-flex align-items-end">
        <Button variant="danger" onClick={() => handleRemoveAddress(index)}>Remove</Button>
      </div>
    </div>
  );
};

export default AddressForm;
