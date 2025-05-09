import { useState, useEffect } from "react";
import { fetchImages } from "./components/api";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!query) return;

    fetchImages(query).then((data) => {
      setImages(data.results);
    });
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      toast.error("Please enter an image name to search!");
      return;
    }
    setQuery(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <SearchBar
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSubmit={handleSubmit}
      />
      {images.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}
