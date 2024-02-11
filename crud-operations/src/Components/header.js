import React from "react";
import "./header.css";
import { BsXbox } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BsChatLeft } from "react-icons/bs";
import UserProfile from "../Components/img/profile.png";
function Header() {
  const send = () => {
    alert("smartthanesh0@gmail.com : This Mail For Any Enquiry");
  };
  return (
    <>
      <div className="header">
        <div className="header-content">
          <p>
            <BsXbox className="logo-icon" />
            Smart Thanesh
          </p>
          <div className="side-icons" onClick={send}>
            <BsGrid className="icon" />
            <BsBell className="icon" />
            <BsChatLeft className="icon" />
            <img src={UserProfile} className="profile-img" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
