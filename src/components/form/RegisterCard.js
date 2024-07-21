import { Button } from "react-bootstrap";


const RegisterCard = ({handleSubmit, children }) => (
  <div className="container-fluid">
    <div className="card mt-4 p-3">
      <div className="card-header">
        <h6>Register</h6>
      </div>
      <div className="card-body">
        {children}
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-end">
            <Button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RegisterCard;
