import React from 'react';
import { toast } from 'react-toastify';

const ConfirmDialog = ({ onConfirm, message }) => {
  return (
    <div>
      <p>{message}</p>
      <div>
        <button
          className="btn btn-danger me-2"
          onClick={() => {
            onConfirm();
            toast.dismiss();
          }}
        >
          Confirm
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => toast.dismiss()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
