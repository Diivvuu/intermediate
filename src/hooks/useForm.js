// hooks/useForm.js

import { useState } from "react";

const useForm = (validate, onSubmit) => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    applyingFor: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let updatedSkills = [...values.additionalSkills];
      if (checked) {
        updatedSkills.push(value);
      } else {
        updatedSkills = updatedSkills.filter((skill) => skill !== value);
      }
      setValues({
        ...values,
        additionalSkills: updatedSkills,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Call onSubmit callback with values
      onSubmit(values);
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
