import React, { Fragment } from "react";

const FormInput = (props) => {
  const {
    styles,
    type,
    onBlur,
    placeholder,
    value,
    onChange,
    required,
    error,
    errorMessage,
  } = props;

  let content;

  if (required) {
    content = (
      <div className={styles}>
        <input
          type={type}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        {error && <p>{errorMessage}</p>}
      </div>
    );
  } else {
    content = (
      <div className={styles}>
        <input
          type={type}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <p>{errorMessage}</p>}
      </div>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default FormInput;
