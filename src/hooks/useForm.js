import React, { useState } from "react";

export function useForm(getFreshModelObject) {
  const [values, setValues] = useState(getFreshModelObject());
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetFormControls = () => {
    setValues(getFreshModelObject());
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  };
}
