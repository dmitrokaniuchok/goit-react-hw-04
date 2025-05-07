import css from "./Contact.module.css";
import { MdPerson, MdPhone } from "react-icons/md";

export default function Contact({ name, phone, onClick }) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.row}>
          <MdPerson className={css.icon} />
          <p className={css.text}>{name}</p>
        </div>
        <div className={css.row}>
          <MdPhone className={css.icon} />
          <p className={css.text}>{phone}</p>
        </div>
      </div>
      <button className={css.button} type="button" onClick={onClick}>
        Delete
      </button>
    </div>
  );
}
