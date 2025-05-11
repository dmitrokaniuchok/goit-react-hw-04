import { useState, useEffect } from "react";
import { fetchImages } from "../api";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    setHasError(false);

    fetchImages(query, page)
      .then((data) => {
        if (data.results.length === 0 && page === 1) {
          toast.error("No images found.");
        }
        setImages((prev) => [...prev, ...data.results]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [query, page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      toast.error("Please enter an image name to search!");
      return;
    }
    setQuery(inputValue);
    setImages([]);
    setPage(1);
    setInputValue("");
    setHasError(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onSubmit={handleSubmit}
      />

      {hasError && (
        <ErrorMessage message="Something went wrong! Try refreshing the page!" />
      )}

      {images.length > 0 && !hasError && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {isLoading && <Loader isOverlay={false} />}

      {images.length > 0 && !isLoading && !hasError && (
        <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
      )}

      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
}
