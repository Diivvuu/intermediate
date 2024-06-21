// components/JobApplicationForm.js

import React, { useState } from "react";
import useForm from "../hooks/useForm"; // Custom hook for form handling

const JobApplicationForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    validateForm,
    onSubmitForm
  );

  const [submittedData, setSubmittedData] = useState(null);

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

  function onSubmitForm(submittedValues) {
    // Display summary of entered data
    setSubmittedData(submittedValues);
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
            className={`shadow appearance-none border ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="fullName"
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={values.fullName || ""}
            onChange={handleChange}
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
            className={`shadow appearance-none border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
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
            className={`shadow appearance-none border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={values.phoneNumber || ""}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
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
            className={`shadow appearance-none border ${
              errors.applyingFor ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="applyingFor"
            name="applyingFor"
            value={values.applyingFor || ""}
            onChange={handleChange}
          >
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.applyingFor && (
            <p className="text-red-500 text-xs italic">{errors.applyingFor}</p>
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
              className={`shadow appearance-none border ${
                errors.relevantExperience ? "border-red-500" : "border-gray-300"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="relevantExperience"
              type="number"
              placeholder="Relevant Experience"
              name="relevantExperience"
              value={values.relevantExperience || ""}
              onChange={handleChange}
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
              className={`shadow appearance-none border ${
                errors.portfolioUrl ? "border-red-500" : "border-gray-300"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="portfolioUrl"
              type="text"
              placeholder="Portfolio URL"
              name="portfolioUrl"
              value={values.portfolioUrl || ""}
              onChange={handleChange}
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
              className={`shadow appearance-none border ${
                errors.managementExperience
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="managementExperience"
              type="text"
              placeholder="Management Experience"
              name="managementExperience"
              value={values.managementExperience || ""}
              onChange={handleChange}
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
            className={`shadow appearance-none border ${
              errors.preferredInterviewTime
                ? "border-red-500"
                : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="preferredInterviewTime"
            type="datetime-local"
            name="preferredInterviewTime"
            value={values.preferredInterviewTime || ""}
            onChange={handleChange}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Display submitted data summary */}
      {submittedData && (
        <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-4">Submitted Data Summary</h2>
          <ul>
            <li>
              <strong>Full Name:</strong> {submittedData.fullName}
            </li>
            <li>
              <strong>Email:</strong> {submittedData.email}
            </li>
            <li>
              <strong>Phone Number:</strong> {submittedData.phoneNumber}
            </li>
            <li>
              <strong>Applying for Position:</strong>{" "}
              {submittedData.applyingFor}
            </li>
            {submittedData.applyingFor === "Developer" && (
              <li>
                <strong>Relevant Experience (Years):</strong>{" "}
                {submittedData.relevantExperience}
              </li>
            )}
            {submittedData.applyingFor === "Designer" && (
              <li>
                <strong>Portfolio URL:</strong> {submittedData.portfolioUrl}
              </li>
            )}
            {submittedData.applyingFor === "Manager" && (
              <li>
                <strong>Management Experience:</strong>{" "}
                {submittedData.managementExperience}
              </li>
            )}
            <li>
              <strong>Additional Skills:</strong>{" "}
              {submittedData.additionalSkills.join(", ")}
            </li>
            <li>
              <strong>Preferred Interview Time:</strong>{" "}
              {new Date(submittedData.preferredInterviewTime).toLocaleString()}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
