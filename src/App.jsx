import { useState, useEffect } from "react";
import ContactList from "./components/ContactList/ContactList.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import "./App.css";
import { nanoid } from "nanoid";

export default function App() {
  const getContacts = () => {
    const saved = localStorage.getItem("contacts");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
          { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
          { id: "id-3", name: "Eden Clements", number: "645-17-79" },
          { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
        ];
  };

  const [contacts, setContacts] = useState(getContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setFilter(event.target.value);
  };

  const handleAddContact = (newContact) => {
    const contactId = {
      id: nanoid(),
      ...newContact,
    };
    setContacts((prev) => [...prev, contactId]);
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div className="form-container">
        <ContactForm onAdd={handleAddContact} />
        <SearchBox value={filter} onChange={handleSearchChange} />
      </div>
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </div>
  );
}
