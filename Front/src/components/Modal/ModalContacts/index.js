import React, { useState } from "react";
import "./style.css";

const ContactsModal = ({ contacts, onClickContact, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          
        {filteredContacts.map((contact) => (
         
         <div key={contact.id._serialized} onClick={() => onClickContact(contact)}>
               <img
                  src={contact.imgUrl || '/user.png'}
                  alt={`Foto de ${contact.name}`}
                  onError={(e) => (e.target.src = '/user.png')}
               />
               <div className="contact-info">
                  <div className="contacts-name">{contact.name}</div>
                  <div className="contact-status">{contact.statusMessage}</div>
               </div>
         </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ContactsModal;
