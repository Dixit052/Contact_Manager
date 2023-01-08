import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import api from  "../api/contacts";
import { v4 as uuid } from 'uuid';
import "./App.css";
import axios from 'axios';
import Header from './Header';
import ContactList from './ContactList';
import AddContact from './AddContact'
import ContactDetails from './ContactDetail';
import UpdateContact from './UpdateContact';

function App() {
  
  const LOCAL_STORAGE_KEY ="contacts";
   

  const [contacts, setContacts] = useState([]
     //JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ??         
  );
  const[searchTerm , setSearchTerm] = useState("");
const [searchResults , setSearchResults] = useState([]);
  
  const fetchQuotes = async () => {
		try {
			const res = await axios.get('http://localhost:3006/contacts');
			setContacts(res.data);
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(() => {
		fetchQuotes();
	}, []);


  const addContactHandler = async (contact) => {
   console.log(contact);
   const request= {
    id : uuid(),
    ...contact,
   }
   const response = await axios.post('http://localhost:3006/contacts',request);
   console.log(response);
   setContacts([...contacts , response.data]);
  };
  const UpdateContactHandler=async (contact)=>{
  const response = await axios.put(`http://localhost:3006/contacts/${contact.id}`,contact);
  const{id , name , email} = response.data;
  setContacts(contacts.map(contact => {
     return contact.id === id ? { ...response.data} : contact ;
  }));
  };
  
  const removeContactHandler = async (id) => {
    await axios.delete(`http://localhost:3006/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };
  const  searchHandler =(searchTerm)=>{
    setSearchTerm(searchTerm);
    if (searchTerm !== ""){
      const  newContactList = contacts.filter((contact)=>{
            return Object.values(contact)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  } ;

  // useEffect(()=>{
  //   localStorage.setItem( LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  // },[contacts]);
  
  
  return(
 <div className='ui container'>
  <Router>
    <Header />
    
    <Routes>
    <Route  
     path="/" element={<ContactList contacts={searchTerm.length<1 ? contacts : searchResults} getContactId = {removeContactHandler}
              term ={searchTerm} searchKeyword ={searchHandler} />}
     /> 
     <Route   path="/add" element={<AddContact
      addContactHandler = {addContactHandler}
      
      />}
     />
     <Route
     path="/contact/:id"
     element = {<ContactDetails />}
     /> 
     <Route
     path="/update/:id"
     element = {<UpdateContact
      UpdateContactHandler={UpdateContactHandler}
     />}
     /> 
     </Routes> 
              
   </Router>
 </div>

  )
}

export default App;