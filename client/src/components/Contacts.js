import { useState, useEffect } from "react";
import Form from "./Form";

function Contacts() {

    const [contacts, setContacts] = useState([{
        firstname: "", 
        lastname: "",
        email: "",
        phone: "",
        notes: "",
    }]);

    useEffect(() => {
        fetch("http://localhost:8080/api/contacts")
        .then((response) => response.json())
        .then(contacts =>{
            for (let index in contacts){
               if( index !== "3"){
                setContacts(contacts);
               }
            };       
        })
    }, []);

    
    const addContact = (newContact) => {
        // console.log(newContact);
        setContacts((contacts) => [...contacts, newContact]);
    }


    return (
      <div className="contacts">
        <h2> List of Contacts </h2>
        <ul>
            {contacts.map((contact, index) =>
                <li key={index}> 
                {contact.firstname} 
                {contact.lastname} 
                {contact.email} 
                {contact.phone} 
                {contact.notes}
                </li>)}
        </ul>
        <Form addContact={addContact} />
      </div>
    );
  }
  
  export default Contacts;