import React from "react";
import styles from "./formfields.css";

const FormFields = ({ formdata, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className={styles.labelError}>{formdata.validationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={(event) => change({ event, id, blur: false })}
              onBlur={(event) => change({ event, id, blur: true })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div>
            <select
              name={formdata.config.name}
              value={formdata.value}
              onChange={(event) => change({ event, id, blur: false })}
              onBlur={(event) => change({ event, id, blur: true })}
            >
              <option key={0} value="">
                No Team
              </option>
              {formdata.config.options.map((item, i) => (
                <option key={i + 1} value={item.id}>
                  {item.name}
                </option>
              ))}
              {showError()}
            </select>
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormFields;
