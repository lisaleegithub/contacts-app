import { useState, useEffect } from "react";
import Form from "./Form";
import DeleteContact from "./DeleteContact";

function ContactsList() {
    // contacts list to use when adding contacts
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
            // for (let index in contacts){
            //    if( index !== "3"){
                setContacts(contacts);
            //    }
            // };       
        })
    }, []);

    const addContact = (newContact) => {
        setContacts((contacts) => [...contacts, newContact]);
    }

    const handleDeleteContact = (id) => {
        deleteContact(id);
    };

    const deleteContact = (id) => {
        fetch(`http://localhost:8080/api/contacts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // if success, do the following
                const newContacts = contacts.filter((i) => i.id !== id);
                setContacts(newContacts);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    
    return (
      <div className="contacts">
        <h2> List of Contacts </h2>
        <ul>
            {contacts.map((contact, index) =>
                <li key={index}>
                    {contact.firstname}<br/> 
                    {contact.lastname} <br/> 
                    {contact.email} <br/> 
                    {contact.phone} <br/> 
                    {contact.notes}<br/> 
                    <br/>
                </li>)}
        </ul>
        <Form addContact={addContact} />
        <DeleteContact handleDeleteContact={handleDeleteContact}/>
      </div>
    );
  }
  
  export default ContactsList;