import React from "react";

const FormFields = (props) => {
  const renderFields = () => {
    const formArray = [];

    for (let elementName in props.formData) {
      formArray.push({
        id: elementName,
        settings: props.formData[elementName],
      });
    }
    return formArray.map((item, i) => {
      return (
        <div className="form_element" key={i}>
          {renderTemplates(item)}
        </div>
      );
    });
  };

  const showLabel = (show, label) => {
    return show ? <label>{label}</label> : null;
  };

  const changeHandler = (event, id, blur) => {
    const newState = props.formData;
    newState[id].value = event.target.value;
    if (blur) {
      let validData = validate(newState[id]);
      newState[id].valid = validData[0];
      newState[id].validationMessage = validData[1];
    }
    newState[id].touched = blur;

    props.change(newState);
  };

  const validate = (element) => {
    let error = [true, ""];

    if (element.validation.minlen) {
      const valid = element.value.length >= element.validation.minlen;
      const message = `${
        !valid
          ? "This field mus be greater than " + element.validation.minlen
          : ""
      }`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() != "";
      const message = `${!valid ? "This field is required" : ""}`;

      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  const showValidation = (data) => {
    let errorMessage = null;

    if (data.validation && !data.valid) {
      errorMessage = (
        <div className="label_error">{data.validationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderTemplates = (data) => {
    let formTemplate = "";
    let values = data.settings;

    switch (values.element) {
      case "input":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <input
              {...values.config}
              onChange={(event) => changeHandler(event, data.id, false)}
              value={values.value}
              onBlur={(event) => changeHandler(event, data.id, true)}
            />
            {showValidation(values)}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <textarea
              {...values.config}
              onChange={(event) => changeHandler(event, data.id)}
              value={values.value}
            />
            {showValidation(values)}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <select
              value={values.value}
              name={values.config.name}
              onChange={(event) => changeHandler(event, data.id)}
            >
              {values.config.options.map((item, i) => (
                <option value={item.value} key={i}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      default:
        formTemplate = "";
    }
    return formTemplate;
  };

  return <div>{renderFields()}</div>;
};

export default FormFields;
