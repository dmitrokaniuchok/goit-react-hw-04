import ImageCard from "./ImageCard.jsx";
import styles from "./ImageGallery.module.css";

export default function Imagegallery({ images, onImageClick }) {
  return (
    <ul className={styles.containerList}>
      {images.map((image) => {
        return (
          <li className={styles.containerItem} key={image.id}>
            <ImageCard
              src={image.urls.small}
              alt={image.description}
              onClick={() => onImageClick(image)}
            />
          </li>
        );
      })}
    </ul>
  );
}
