import React, { useState } from 'react';

function ImageGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return <p>No hay imágenes disponibles.</p>; // Muestra un mensaje si no hay imágenes
  }

  const showNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <img
        src={images[currentImageIndex]}
        alt={`Imagen ${currentImageIndex + 1}`}
        className="w-full h-auto max-w-screen-sm rounded-lg"
      />
      <button onClick={showPrevImage}>Anterior</button>
      <button onClick={showNextImage}>Siguiente</button>
    </div>
  );
}

export default ImageGallery;



