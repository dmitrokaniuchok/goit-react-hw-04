import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({
  message = "Something went wrong! Try refreshing the page!",
}) {
  return <div className={styles.error}>{message}</div>;
}
