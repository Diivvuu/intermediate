import React from "react";
import InputField from "./InputField";

const JobApplicationForm = () => {
  const initialFormData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    applyingForPosition: "",
    Experience: "",
    portfoloioURL: "",
    managementExperience: "",
    addSkills: " ",
    preferredIntTime: "",
  };
  const validate = (formData) => {
    let errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Come on! Your Full Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Your Email address is missing, How will we reach you?";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Oops! Looks liek your Email is not quite right.";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "We need your Phone Number to give you a call!";
    } else if (isNaN(formData.phoneNumber)) {
      errors.phoneNumber =
        "Are you sure that's a Phone Number? It seems fishy.";
    }
    if (
      formData.applyingForPosition === "Designer" &&
      !formData.portfolioURL.trim()
    ) {
      errors.portfolioURL =
        "Show us your Portfolio URL. We promise we won’t judge… much.";
    } else if (
      formData.applyingForPosition === "Designer" &&
      !/^https?:\/\/\S+$/.test(formData.portfolioURL)
    ) {
      errors.portfolioURL = "Hmm, your Portfolio URL needs to be a valid URL.";
    }

    if (
      formData.applyingForPosition === "Manager" &&
      !formData.managementExperience.trim()
    ) {
      errors.managementExperience =
        "Got any Management Experience? Share it with us!";
    }

    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills =
        "Hey, you need at least one skill to impress us!";
    }

    if (!formData.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime =
        "Don't leave us hanging! When's your Preferred Interview Time?";
    }

    return errors;
  };
  return (
    <div>
      <form>
        <InputField />
        <InputField />
        <InputField />
        <InputField />
      </form>
    </div>
  );
};

export default JobApplicationForm;
