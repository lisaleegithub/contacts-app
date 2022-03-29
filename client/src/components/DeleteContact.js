import React from "react";
import { useState } from "react";

const DeleteContact = ({ handleDeleteContact }) => {
    const [deleteContact, setDeleteContact] = useState('');

    return (
        <div>
            <h3>Delete Contact</h3>
            <form id="delete-user" action="#" 
            onSubmit={(e) => {
                e.preventDefault();
                handleDeleteContact(deleteContact);
                // setDeleteContact('');
                console.log()
                }}
            >
                <fieldset>
                    <label>Contact ID</label>
                    <input type="number" id="delete-contact-id"
                    value={deleteContact}
                    onChange={(e) => setDeleteContact(e.target.value)} />
                </fieldset>
                <input type="submit" />
            </form>
        </div >
    )
}

export default DeleteContact;