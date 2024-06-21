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
    }
  };
  return <div></div>;
};

export default useFormHook;
