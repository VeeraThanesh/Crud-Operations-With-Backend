import React, { useEffect, useState } from "react";
import "./list.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const List = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/user/getAllUsers"
      );
      console.log(response.data.data);
      if (response.data && response.data.data) {
        setRowData([...response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(rowData);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/user/deleteUser/${id}`
      );
      console.log(response.data.data);
      if (response.data && response.data) {
        // alert("User deleted successfully");
        getList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(rowData);

  return (
    <>
      <div className="list-container">
        <div className="list-top">
          <h3>Users Details</h3>
          <button
            onClick={() => {
              navigate("/create");
            }}
          >
            <CiCirclePlus className="plus" /> Add User
          </button>
        </div>
        <div className="list-box">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="list-head">FirstName</div>
                </th>
                <th>
                  <div className="list-head">LastName</div>
                </th>
                <th>
                  <div className="list-head">Age</div>
                </th>
                <th>
                  <div className="list-head">Email</div>
                </th>
                <th>
                  <div className="list-head">Qualification</div>
                </th>
                <th>
                  <div className="list-head">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Smart</td>
                <td>Thanesh</td>
                <td>03</td>
                <td>smartthanesh0@gmail.com</td>
                <td>YouTuber</td>
                <td className="all-demo-btn">
                  <FaRegEye className="view-btn" />
                  <MdEdit className="edit-btn" />
                  <MdDelete className="delete-btn" />
                </td>
              </tr>
              {rowData?.length > 0 ? (
                rowData?.map((element) => (
                  <tr>
                    <td>
                      <div className="list-data">{element.firstName}</div>
                    </td>
                    <td>
                      <div className="list-data">{element.lastName}</div>
                    </td>
                    <td>
                      <div className="list-data">
                        <p>{element.age}</p>
                      </div>
                    </td>
                    <td>
                      <div className="list-data">{element.email}</div>
                    </td>
                    <td>
                      <div className="list-data">{element.qualification}</div>
                    </td>
                    <td className="all-btn">
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/view/${element._id}`)}
                      >
                        <FaRegEye />
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/edit/${element._id}`)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(element._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="connect-backend">No Data or Connect Backend</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default List;
