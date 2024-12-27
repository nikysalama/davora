import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const preloadImages = () => {
      const nextIndex = (currentIndex + 1) % images.length;
      [images[currentIndex], images[nextIndex]].forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages();
  }, [currentIndex, images]);

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider-container">
      <button className="prev-button" onClick={prevSlide}>&#8249;</button>
      <img src={images[currentIndex]} alt={`slide ${currentIndex}`} className="slider-image" />
      <button className="next-button" onClick={nextSlide}>&#8250;</button>
    </div>
  );
};

export default ImageSlider;
