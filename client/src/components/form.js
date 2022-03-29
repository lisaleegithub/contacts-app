import { useState } from "react";

const Form = (props) => {
    const [contact, setContact] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        notes: "",
    });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const firstname = event.target.value;
        setContact((contact) => ({ ...contact, firstname }));
    }
    const handleLastnameChange = (event) => {
        const lastname = event.target.value;
        setContact((contact) => ({ ...contact, lastname }));
    }
    const handleEmailChange = (event) => {
        const email = event.target.value;
        setContact((contact) => ({ ...contact, email }));
    }
    const handlePhoneChange = (event) => {
        const phone = event.target.value;
        setContact((contact) => ({ ...contact, phone }));
    }
    const handleNotesChange = (event) => {
        const notes = event.target.value;
        setContact((contact) => ({ ...contact, notes }));
    }

    //A function to handle the post request
    const postContact = (newContact) => {
        return fetch('http://localhost:8080/api/contacts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(newContact)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        //   setContact(contact);
        // console.log("From the post ", data);
        props.addContact(data);
    });
    }

    // //A function to handle the put request
    // const updateContact = (newContact) => {
    //     return fetch('http://localhost:8080/api/contacts/${contactId}', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newContact)
    //     }).then((response) => {
    //         return response.json()
    //     }).then((data) => {
    //         // console.log("From the post ", data);
    //         props.addContact(data);
    //     });
    // }

    const handleSubmit = (e) => {
        // prevent from forms refreshing when submitted 
        e.preventDefault();
        // console.log("current contact is" + JSON.stringify(contact));
        setContact(contact);
        postContact(contact);
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>First Name</label>
                <input
                    type="text"
                    id="add-user-firstname"
                    placeholder="First Name"
                    required
                    value={contact.firstname}
                    onChange={handleNameChange}

                />
                <label>Last Name</label>
                <input
                    type="text"
                    id="add-user-lastname"
                    placeholder="Last Name"
                    required
                    value={contact.lastname}
                    onChange={handleLastnameChange}
                />
                <label>Email</label>
                <input
                    type="text"
                    id="add-user-email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={handleEmailChange}
                />
                <label>Phone</label>
                <input
                    type="text"
                    id="add-user-phone"
                    placeholder="Phone Number"
                    value={contact.phone}
                    onChange={handlePhoneChange}
                />
                <label>Notes</label>
                <input
                    type="text"
                    id="add-user-notes"
                    placeholder="Enter Notes"
                    value={contact.notes}
                    onChange={handleNotesChange}
                />
            </fieldset>
            <button type="submit">Add</button>
        </form>
    );
};

export default Form;