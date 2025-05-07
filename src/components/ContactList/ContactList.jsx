import Contact from "../Contact/Contact.jsx";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul className={css.container}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact
            name={contact.name}
            phone={contact.number}
            onClick={() => onDelete(contact.id)}
          />
        </li>
      ))}
    </ul>
  );
}
