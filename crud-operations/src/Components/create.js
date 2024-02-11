import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import "./create.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [createState, setCreateState] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    qualification: "",
    password: "",
  });

  useEffect(
    () => {
      if (id !== undefined) {
        getUser();
      }
    } /*, []*/
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setCreateState((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const save = async (e) => {
    try {
      console.log(createState);
      if (id !== undefined) {
        const response = await axios.put(
          `http://localhost:5000/api/v1/user/updateUser/${id}`,
          createState
        );
        console.log(response);
        // alert("User updated Successfully");
      } else {
        e.preventDefault();
        setFormErrors(validate(createState));
        setErrorMessage(true);
        setIsSubmit(true);
        const response = await axios.post(
          "http://localhost:5000/api/v1/user/createUser",
          createState
        );
        console.log(response);
        // alert("User Login Created");
      }
      if (isSubmit) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // alert("User Created failed");
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/getUser/${id}`
      );
      console.log(response);
      if (response.data && response.data.data) {
        setCreateState((prevalue) => {
          return {
            ...prevalue,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            age: response.data.data.age,
            email: response.data.data.email,
            qualification: response.data.data.qualification,
            password: response.data.data.password,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (value) => {
    const errors = {};

    const regex = /\S+@\S+\.\S+/;

    if (!isNaN(value.firstName) || value.firstName?.trim() === "") {
      errors.firstName = "Enter First Name *";
      setIsSubmit(false);
    }
    if (!isNaN(value.lastName) || value.lastName?.trim() === "") {
      errors.lastName = "Enter Last Name *";
      setIsSubmit(false);
    }
    if (!value.age) {
      errors.age = "Enter Your Age *";
      setIsSubmit(false);
    }
    if (!value.email) {
      errors.email = "Email Id Required!";
      setIsSubmit(false);
    } else if (!regex.test(value.email)) {
      errors.email = "Enter valid email";
      setIsSubmit(false);
    }
    if (!value.qualification) {
      errors.qualification = "Enter Qualification *";
      setIsSubmit(false);
    }
    if (!value.password) {
      errors.password = "Enter Password *";
      setIsSubmit(false);
    }
    return errors;
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="content">
          <h2>Create User</h2>
          <div className="input-field">
            <div className="username-field">
              <div className="input-field-content">
                <div className="input-top">
                  <label htmlFor="">First Name</label>
                  {errorMessage ? (
                    <p className="name-error-message">{formErrors.firstName}</p>
                  ) : (
                    ""
                  )}
                </div>
                <input
                  type="text"
                  name="firstName"
                  minLength={3}
                  maxLength={10}
                  required={true}
                  placeholder="Enter FirstName"
                  value={createState.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field-content">
                <div className="input-top">
                  <label htmlFor="">Last Name</label>
                  {errorMessage ? (
                    <p className="name-error-message">{formErrors.lastName}</p>
                  ) : (
                    ""
                  )}
                </div>
                <input
                  type="text"
                  name="lastName"
                  mniLength={3}
                  maxLength={7}
                  required={true}
                  placeholder="Enter LastName"
                  value={createState.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-field-content">
              <div className="input-top">
                <label htmlFor="">Age</label>
                {errorMessage ? (
                  <p className="error-message">{formErrors.age}</p>
                ) : (
                  ""
                )}
              </div>
              <input
                type="number"
                name="age"
                placeholder="Enter Your Age"
                maxLength={2}
                required={true}
                value={createState.age}
                onChange={handleChange}
              />
            </div>
            <div className="input-field-content">
              <div className="input-top">
                <label htmlFor="">Email</label>
                {errorMessage ? (
                  <p className="error-message">{formErrors.email}</p>
                ) : (
                  ""
                )}
              </div>
              <input
                type="email"
                name="email"
                required={true}
                placeholder="Enter Email"
                value={createState.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-field-content">
              <div className="input-top">
                <label htmlFor="">Qualification</label>
                {errorMessage ? (
                  <p className="error-message">{formErrors.qualification}</p>
                ) : (
                  ""
                )}
              </div>
              <input
                type="text"
                name="qualification"
                required={true}
                placeholder="Enter Qualification"
                value={createState.qualification}
                onChange={handleChange}
              />
            </div>

            <div className="input-field-content">
              <div className="input-top">
                <label htmlFor="">Password</label>
                {errorMessage ? (
                  <p className="error-message">{formErrors.password}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  minLength={6}
                  maxLength={10}
                  required={true}
                  value={createState.password}
                  onChange={handleChange}
                />
                <i
                  onClick={handleTogglePassword}
                  className="password-on-off-icon"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </i>
              </div>
            </div>
          </div>
          <button onClick={save}>
            {" "}
            {id !== undefined ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Create;
