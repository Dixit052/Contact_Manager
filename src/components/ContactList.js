import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import ContactCard from "./ContactCard";
const ContactList = (props) => {
 
    const inputEl = useRef("");
    const deleteContactHandler = (id)=>{
        props.getContactId(id);
    }
    
    const renderList = props.contacts.map((contact) => {
        return (
            <>
               <ContactCard
                contact = {contact} 
                clickHander = {deleteContactHandler}
                key = {contact.id}
                
                />

            </>
        );
    });
    
    const getSearchTerm =()=>{
        props.searchKeyword(inputEl.current.value);
    };
    return (
        <div className="main">
            <h2 >Contact List
                <Link to="/add" style={{marginLeft:"28.633rem"}}>
                <button className="ui button blue right">Add Contact</button>
                </Link>          
            </h2>
            <div className="ui search">
                <div className="ui icon input" >
                    <input type="text" 
                     ref ={inputEl}
                     placeholder="Search Contacts"
                     className="prompt"
                     style={{fontWeight:"bold" }}
                     value={props.term} 
                     onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>

            </div>

            <div className="ui list ">
                {renderList.length >0 ? renderList : "No contacts available"}
            </div>
        </div>


    );

};
export default ContactList;
