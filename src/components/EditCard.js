import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({
    companyName: '',
    personName: '',
    email: '',
    phone: '',
    website: '',
    businessHours: '',
    promotions: '',
    socialLinks: { facebook: '', instagram: '', linkedin: '' },
    footer: '',
    images: []  // Para almacenar imágenes existentes
  });
  const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener los datos de la tarjeta existente
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cards/${id}`);
        setCardData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar la tarjeta:', error);
      }
    };
    fetchCard();
  }, [id]);

  // Manejar las nuevas imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  // Eliminar una imagen existente
  const handleRemoveImage = (index) => {
    const updatedImages = cardData.images.filter((_, i) => i !== index);
    setCardData({ ...cardData, images: updatedImages });
  };

  // Enviar los datos del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('companyName', cardData.companyName);
    formData.append('personName', cardData.personName);
    formData.append('email', cardData.email);
    formData.append('phone', cardData.phone);
    formData.append('website', cardData.website);
    formData.append('businessHours', cardData.businessHours);
    formData.append('promotions', cardData.promotions);
    formData.append('socialLinks', JSON.stringify(cardData.socialLinks));
    formData.append('footer', cardData.footer);

    // Adjuntar imágenes existentes
    cardData.images.forEach((image, index) => {
      formData.append('existingImages', image);
    });

    // Adjuntar nuevas imágenes
    newImages.forEach((image) => {
      formData.append('newImages', image);
    });

    try {
      await axios.put(`http://localhost:8000/api/cards/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/cards');
    } catch (error) {
      console.error('Error al actualizar la tarjeta:', error);
    }
  };

  // Mostrar formulario de edición
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Tarjeta de {cardData.companyName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Empresa:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.companyName}
            onChange={(e) => setCardData({ ...cardData, companyName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Persona:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.personName}
            onChange={(e) => setCardData({ ...cardData, personName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.email}
            onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
          <input
            type="tel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.phone}
            onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Página Web:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.website}
            onChange={(e) => setCardData({ ...cardData, website: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Horario de Atención:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.businessHours}
            onChange={(e) => setCardData({ ...cardData, businessHours: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Promociones:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.promotions}
            onChange={(e) => setCardData({ ...cardData, promotions: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Footer:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cardData.footer}
            onChange={(e) => setCardData({ ...cardData, footer: e.target.value })}
          />
        </div>
        
        {/* Mostrar imágenes existentes */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Imágenes existentes:</h3>
          {cardData.images && cardData.images.map((image, index) => (
            <div key={index} className="mb-2">
              <img src={`data:image/jpeg;base64,${image}`} alt="Imagen existente" style={{ width: '100px' }} />
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                onClick={() => handleRemoveImage(index)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Subir nuevas imágenes */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subir nuevas imágenes:</label>
          <input
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {/* Botón para guardar cambios */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditCard;








