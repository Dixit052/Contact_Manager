import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";
const ContactCard=(props)=>{
const {id , name , email} = props.contact;
return (
<div className="item">
     <img className="ui avatar image"   src={user} alt="user"></img>
     <div className="content">
      
      <Link
      to={`/contact/${id}`}
      state={{ contact :props.contact }}
       >
        <div className="header">{name} </div>
        <div>{email}</div>
      </Link>  
     </div>
      <Link to={`/update/${id}`}
       state={{ contact :props.contact }} 
      >
       <i className="ui edit alternate outline icon" 
       style={{  marginLeft:"27.4rem", color: "blue" ,  }}
       ></i>
       </Link>
       <div className="ui flex">
       <i className="ui trash alternate outline icon flex" 
       style={{  paddingLeft:"46rem", color: "red",   }}
       onClick={()=>props.clickHander(id)}
       ></i>
       </div>
     
     

</div>



);
};
 export default ContactCard;
