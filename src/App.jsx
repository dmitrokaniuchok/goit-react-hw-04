import { useState, useEffect } from "react";
import { fetchImages } from "./components/api";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
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
        toast.error("Failed to load images.");
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
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader isOverlay={false} />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
