import PropTypes from 'prop-types';

const FieldForm = ({
  label,
  name,
  type = 'text',
  value = '',
  options = [],
  onChange,
  rows = 3,
  error = '',
  onRemove,
  previews = []
}) => {
  const renderInputField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            className="form-control"
            id={name}
            name={name}
            value={value}
            rows={rows}
            onChange={onChange}
          />
        );
      case 'select':
        return (
          <select
            className="form-select"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          >
            {options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={name}
              name={name}
              checked={!!value}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor={name}>
              {label}
            </label>
          </div>
        );
      case 'radio':
        return (
          <div className="d-flex border gap-md-2 form-control">
            {options.map((option, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`${name}_${index}`}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                />
                <label className="form-check-label" htmlFor={`${name}_${index}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case 'file':
        return (
          <div className="tab-content">
            {Array.isArray(previews) && previews.map((preview, index) => (
              <div className="img" key={index}>
                {preview && <img src={preview} alt="Selected file" />}
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="file-upload-label remove-img-button"
                >
                  Remove
                </button>
              </div>
            ))}
            <div>
              <input
                type="file"
                id={name}
                name={name}
                onChange={onChange}
                style={{ display: "none" }}
                multiple
              />
              <label htmlFor={name} className="file-upload-label">
                {value ? "Change files" : "Select files"}
              </label>
            </div>
          </div>
        );
      default:
        return (
          <input
            className="form-control"
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className="form-group">
      {type !== 'checkbox' && <label htmlFor={name}>{label}</label>}
      {renderInputField()}
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

FieldForm.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'textarea', 'select', 'checkbox', 'radio', 'file']),
  value: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  error: PropTypes.string,
  onRemove: PropTypes.func,
  previews: PropTypes.arrayOf(PropTypes.string)
};

export default FieldForm;
