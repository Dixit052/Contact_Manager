import React from "react";
import { useLocation } from "react-router-dom";
import avatar from "../images/man_avatar.webp"


const ContactDetails = (props)=> {
    const location = useLocation();
    console.log(location);
    const { id , name , email} = location.state.contact;
  

return (

      <div  className="main">
        <div className="ui card centered">
          <div className="ui image">
            <img src={avatar} alt="user" ></img>
          </div>
          <div className="content">
            <div className="header">{name}</div>
            <div className="description">{email}</div>
          </div>
        </div>
      </div>





 );

};
export default ContactDetails ;