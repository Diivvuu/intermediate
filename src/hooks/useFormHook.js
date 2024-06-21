import React, { useState } from "react";

const useFormHook = (initialFormData, validate) => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckBoxChange = (value, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        addSkills: [...formData.addSkills, value],
      });
    } else {
      setFormData({
        ...formData,
        addSkills: formData.addSkills.filter((skill) => skill !== value),
      });
    }
  };
  const validateForm = () => {
    const errors = validate(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
    }
  };
  return {
    formData,
    formErrors,
    handleInputChange,
    handleCheckBoxChange,
    handleSubmit,
  };
};

export default useFormHook;
