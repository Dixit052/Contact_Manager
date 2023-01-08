import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate , useLocation } from "react-router-dom";


const UpdateContact=(props)=>{
   const navigate = useNavigate();
   const location = useLocation();
    // console.log(location);
    const { id , name , email} = location.state.contact;
   const [inputs,setInputs] = useState({ id : id ,
                                         name:name,
                                         email:email
                                       });

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
   
   const handleSubmit = (event) => {
      event.preventDefault();
      props.UpdateContactHandler(inputs);
      //alert("Contact updated successfully !");
      //console.log(inputs);
      setInputs({
                 name: "",
                 email :"", 
                })
      navigate("/");         

    }

   return( 
   
      <div className="ui main">
        <h2>Edit Contact</h2>
         <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"
             value={inputs.name || ""} 
             onChange={handleChange}
            />
            
            
            </div>
            <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" 
             value={inputs.email || ""} 
             onChange={handleChange}
            />
            
            </div>
            <button className="ui button blue">
                 Update
            </button>
            <Link to="/">  
                     Show Contacts
            </Link>
                  
         </form>

      </div>
   ) ;
   
};
export default UpdateContact;
