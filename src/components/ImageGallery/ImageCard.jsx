import styles from "./ImageCard.module.css";

export default function ImageCard({ src, description, onClick }) {
  return (
    <img className={styles.img} src={src} alt={description} onClick={onClick} />
  );
}
