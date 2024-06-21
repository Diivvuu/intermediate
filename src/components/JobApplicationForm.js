import React, { useState } from "react";
import useForm from "../hooks/useForm"; // Custom hook for form handling

const JobApplicationForm = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm(validateForm);

  function validateForm() {
    let errors = {};

    if (!values.fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone Number must contain only digits";
    } else if (values.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be 10 digits long";
    }

    if (
      values.applyingFor === "Developer" ||
      values.applyingFor === "Designer"
    ) {
      if (!values.relevantExperience) {
        errors.relevantExperience = "Relevant Experience is required";
      } else if (
        isNaN(values.relevantExperience) ||
        parseInt(values.relevantExperience) <= 0
      ) {
        errors.relevantExperience =
          "Relevant Experience must be a number greater than 0";
      }
    }

    if (values.applyingFor === "Designer") {
      if (!values.portfolioUrl) {
        errors.portfolioUrl = "Portfolio URL is required";
      } else if (!isValidUrl(values.portfolioUrl)) {
        errors.portfolioUrl = "Portfolio URL must be a valid URL";
      }
    }

    if (values.applyingFor === "Manager") {
      if (!values.managementExperience) {
        errors.managementExperience = "Management Experience is required";
      }
    }

    if (!values.additionalSkills || values.additionalSkills.length === 0) {
      errors.additionalSkills = "At least one skill must be selected";
    }

    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = "Preferred Interview Time is required";
    }

    return errors;
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const onSubmitForm = () => {
    setSubmittedData(values);
    setFormSubmitted(true);
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Display submitted data summary */}
        {submittedData && (
          <div className="bg-zinc-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Submitted Data Summary
            </h2>
            <ul className="text-gray-700">
              <li className="mb-2">
                <span className="font-semibold">Full Name:</span>{" "}
                {submittedData.fullName}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {submittedData.email}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Phone Number:</span>{" "}
                {submittedData.phoneNumber}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Applying for Position:</span>{" "}
                {submittedData.applyingFor}
              </li>
              {submittedData.applyingFor === "Developer" && (
                <li className="mb-2">
                  <span className="font-semibold">
                    Relevant Experience (Years):
                  </span>{" "}
                  {submittedData.relevantExperience}
                </li>
              )}
              {submittedData.applyingFor === "Designer" && (
                <li className="mb-2">
                  <span className="font-semibold">Portfolio URL:</span>{" "}
                  {submittedData.portfolioUrl}
                </li>
              )}
              {submittedData.applyingFor === "Manager" && (
                <li className="mb-2">
                  <span className="font-semibold">Management Experience:</span>{" "}
                  {submittedData.managementExperience}
                </li>
              )}
              <li className="mb-2">
                <span className="font-semibold">Additional Skills:</span>{" "}
                {submittedData.additionalSkills.join(", ")}
              </li>
              <li className="mb-2">
                <span className="font-semibold">Preferred Interview Time:</span>{" "}
                {new Date(
                  submittedData.preferredInterviewTime
                ).toLocaleString()}
              </li>
            </ul>
          </div>
        )}

        {/* Display form if it has not been submitted */}
        {!formSubmitted && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitForm();
            }}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* Full Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                id="fullName"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={values.fullName || ""}
                onChange={handleChange}
                disabled={formSubmitted}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs italic">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                disabled={formSubmitted}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber || ""}
                onChange={handleChange}
                disabled={formSubmitted}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs italic">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Applying for Position */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="applyingFor"
              >
                Applying for Position
              </label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.applyingFor ? "border-red-500" : "border-gray-300"
                }`}
                id="applyingFor"
                name="applyingFor"
                value={values.applyingFor || ""}
                onChange={handleChange}
                disabled={formSubmitted}
              >
                <option value="">Select Position</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.applyingFor && (
                <p className="text-red-500 text-xs italic">
                  {errors.applyingFor}
                </p>
              )}
            </div>

            {/* Relevant Experience */}
            {(values.applyingFor === "Developer" ||
              values.applyingFor === "Designer") && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="relevantExperience"
                >
                  Relevant Experience (Years)
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.relevantExperience
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  id="relevantExperience"
                  type="number"
                  placeholder="Relevant Experience"
                  name="relevantExperience"
                  value={values.relevantExperience || ""}
                  onChange={handleChange}
                  disabled={formSubmitted}
                />
                {errors.relevantExperience && (
                  <p className="text-red-500 text-xs italic">
                    {errors.relevantExperience}
                  </p>
                )}
              </div>
            )}

            {/* Portfolio URL */}
            {values.applyingFor === "Designer" && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="portfolioUrl"
                >
                  Portfolio URL
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.portfolioUrl ? "border-red-500" : "border-gray-300"
                  }`}
                  id="portfolioUrl"
                  type="text"
                  placeholder="Portfolio URL"
                  name="portfolioUrl"
                  value={values.portfolioUrl || ""}
                  onChange={handleChange}
                  disabled={formSubmitted}
                />
                {errors.portfolioUrl && (
                  <p className="text-red-500 text-xs italic">
                    {errors.portfolioUrl}
                  </p>
                )}
              </div>
            )}

            {/* Management Experience */}
            {values.applyingFor === "Manager" && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="managementExperience"
                >
                  Management Experience
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.managementExperience
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  id="managementExperience"
                  type="text"
                  placeholder="Management Experience"
                  name="managementExperience"
                  value={values.managementExperience || ""}
                  onChange={handleChange}
                  disabled={formSubmitted}
                />
                {errors.managementExperience && (
                  <p className="text-red-500 text-xs italic">
                    {errors.managementExperience}
                  </p>
                )}
              </div>
            )}

            {/* Additional Skills */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Additional Skills
              </label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    name="additionalSkills"
                    value="JavaScript"
                    onChange={handleChange}
                    disabled={formSubmitted}
                  />
                  <span className="ml-2 text-gray-700">JavaScript</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    name="additionalSkills"
                    value="CSS"
                    onChange={handleChange}
                    disabled={formSubmitted}
                  />
                  <span className="ml-2 text-gray-700">CSS</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    name="additionalSkills"
                    value="Python"
                    onChange={handleChange}
                    disabled={formSubmitted}
                  />
                  <span className="ml-2 text-gray-700">Python</span>
                </label>
                {/* Add more skills as needed */}
              </div>
              {errors.additionalSkills && (
                <p className="text-red-500 text-xs italic">
                  {errors.additionalSkills}
                </p>
              )}
            </div>

            {/* Preferred Interview Time */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="preferredInterviewTime"
              >
                Preferred Interview Time
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.preferredInterviewTime
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                id="preferredInterviewTime"
                type="datetime-local"
                name="preferredInterviewTime"
                value={values.preferredInterviewTime || ""}
                onChange={handleChange}
                disabled={formSubmitted}
              />
              {errors.preferredInterviewTime && (
                <p className="text-red-500 text-xs italic">
                  {errors.preferredInterviewTime}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${
                  formSubmitted ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={formSubmitted}
              >
                {formSubmitted ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;
