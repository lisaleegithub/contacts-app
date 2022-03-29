import { useState, useEffect } from "react";
// import Form from "./Form";

function Contacts() {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch("/api/contacts")
        .then((response) => response.json())
        .then(contacts =>{
            // for (let index in contacts){
            //    if( index !== "3"){
                setContacts(contacts);
            //    }
            // };       
        })
    }, []);

    

    // const addContacts = (newContact) => {
    //     //console.log(newContact);
    //     //postContact(newContact);
    //     setContacts((contacts) => [...contacts, newContact]);
    // }


    return (
      <div className="contacts">
        <h2> List of Contacts </h2>
        <ul>
            {contacts.map(contact =>
                <li key={contact.id}> {contact.firstname} {contact.lastname}</li>)}
        </ul>
        {/* <Form addContacts={addContacts} /> */}
      </div>
    );
  }
  
  export default Contacts;