import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const randomNumber = () => Math.floor(Math.random() * 1000) + 1;
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isSubmitDisabled =
    formData.firstName.trim() === "" ||
    formData.lastName.trim() === "" ||
    formData.email.trim() === "" ||
    formData.topic === "";

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="supportPage">
      {isFormSubmitted ? (
        <>
          <h3>Support Ticket Form</h3>
          <hr />
          <p className="thankyouMessage">
            Thank you for sending us your report, we will track the problem now
          </p>
          <p className="ticketNumber">ticket number: {randomNumber()}</p>
          <div className="backButton">
            <button
              type="submit"
              className="buttonStyling"
              onClick={handleNavigate}
            >
              Back to Calculator
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>Support Ticket Form</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="formStyle">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="formStyle">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="formStyle">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="error">{errors.email}</div>
            </div>

            <div>
              <label>Topic:</label>
              <div className="formRadio">
                <label>
                  <input
                    type="radio"
                    name="topic"
                    value="general"
                    checked={formData.topic === "general"}
                    onChange={handleChange}
                  />
                  General
                </label>
                <label>
                  <input
                    type="radio"
                    name="topic"
                    value="bug"
                    checked={formData.topic === "bug"}
                    onChange={handleChange}
                  />
                  Bug
                </label>
              </div>
            </div>

            <div className="formDescription">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="formButton">
              <button
                type="submit"
                className="buttonStyling"
                disabled={isSubmitDisabled}
              >
                SEND
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SupportPage;
