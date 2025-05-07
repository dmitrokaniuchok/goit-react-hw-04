import css from "./ContactForm.module.css";
import { MdPerson, MdPhone } from "react-icons/md";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be 30 characters or less")
    .required("Required"),
  number: Yup.string()
    .min(7)
    .max(15)
    .matches(/^\d+$/, "Only numbers can be entered")
    .required("Required"),
});

export default function ContactForm({ onAdd }) {
  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const newContact = {
          id: nanoid(),
          name: values.name,
          number: values.number,
        };
        onAdd(newContact);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <div className={css.labelRow}>
            Name
            <MdPerson className={css.icon} />
          </div>
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage component="div" className={css.error} name="name" />
        </label>

        <label className={css.label}>
          <div className={css.labelRow}>
            Number
            <MdPhone className={css.icon} />
          </div>
          <Field className={css.input} type="tel" name="number" />
          <ErrorMessage component="div" className={css.error} name="number" />
        </label>

        <button className={css.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
