import FieldForm from "@/components/form/FieldForm";
import { Button } from "react-bootstrap";

const AddressForm = ({ index, address, handleChange, handleRemoveAddress }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-3">
        <FieldForm
          label="Zip Code"
          type="text"
          name="zipCode"
          value={address.zipCode}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-5">
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
      <div className="col-md-2">
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
          label="Neighborhood"
          type="text"
          name="neighborhood"
          value={address.neighborhood}
          onChange={(e) => handleChange(index, e)}
        />
      </div>

      <div className="col-md-5">
        <FieldForm
          label="City"
          type="text"
          name="city"
          value={address.city}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-3">
        <FieldForm
          label="State"
          type="text"
          name="state"
          value={address.state}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
      <div className="col-md-4 d-flex align-items-end justify-content-start">
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleRemoveAddress(index)}
        >
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </div>
  );
};

export default AddressForm;
