import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader({ isOverlay }) {
  return (
    <div className={isOverlay ? styles.overlay : styles.centered}>
      <ClipLoader size={50} color="#28a745" />
    </div>
  );
}
