import ImageCard from "./ImageCard.jsx";
import styles from "./ImageGallery.module.css";

export default function Imagegallery({ images, openModal }) {
  return (
    <ul className={styles.containerList}>
      {images.map((image) => {
        return (
          <li className={styles.containerItem} key={image.id}>
            <ImageCard
              src={image.urls.small}
              alt={image.description}
              onClick={() => openModal(image.urls.regular)}
            />
          </li>
        );
      })}
    </ul>
  );
}
