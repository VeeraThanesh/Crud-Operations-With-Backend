import React, { useState, useEffect } from "react";
import axios from "axios";
import "./view.css";
import Header from "./header";
import { useParams, useNavigate } from "react-router-dom";

function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
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

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/getUser/${id}`
      );
      console.log(response);
      if (response.data && response.data.data) {
        setFormState((prevalue) => {
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
  return (
    <>
      <Header />
      <div className="view-container">
        <h1>User Details</h1>
        <div className="view-content">
          <table>
            <tr className="view-list-data">
              <td>
                <label htmlFor="">FirstName</label>
              </td>
              <td>
                <p>:</p>
              </td>
              <td>
                <h4>{formState.firstName}</h4>
              </td>
            </tr>
            <tr className="view-list-data">
              <td>
                <label htmlFor="">LastName</label>
              </td>
              <td>
                <p>:</p>
              </td>
              <td>
                <h4>{formState.lastName}</h4>
              </td>
            </tr>
            <tr className="view-list-data">
              <td>
                <label htmlFor="">Age</label>
              </td>
              <td>
                <p>:</p>
              </td>
              <td>
                <h4>{formState.age}</h4>
              </td>
            </tr>
            <tr className="view-list-data">
              <td>
                <label htmlFor="">Email</label>
              </td>
              <td>
                <p>:</p>
              </td>
              <td>
                <h4>{formState.email}</h4>
              </td>
            </tr>

            <tr className="view-list-data">
              <td>
                <label htmlFor="">Qualification</label>
              </td>
              <td>
                <p>:</p>
              </td>
              <td>
                <h4>{formState.qualification}</h4>
              </td>
            </tr>

            {/* <tr className="view-list-data">
              <td>
                <label htmlFor="">Password</label>
              </td>
              <td>
                <p>:</p>
              </td>
              <td>
                <h4>{formState.password}</h4>
              </td>
            </tr> */}
          </table>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </>
  );
}

export default View;
