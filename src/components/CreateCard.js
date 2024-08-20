import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCard() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [personName, setPersonName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [promotions, setPromotions] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    linkedin: ''
  });
  const [footer, setFooter] = useState('');
  const [images, setImages] = useState([]);

  // Manejar la subida de imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);  // Guardamos las imágenes en el estado
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('personName', personName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('website', website);
    formData.append('businessHours', businessHours);
    formData.append('promotions', promotions);
    formData.append('socialLinks', JSON.stringify(socialLinks));
    formData.append('footer', footer);

    // Añadir las imágenes al FormData
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      // Verifica que todos los campos requeridos están presentes
      if (!companyName || !personName || !email || !phone) {
        throw new Error('Todos los campos obligatorios deben ser completados');
      }

      // Realiza la petición para crear una nueva tarjeta
      await axios.post('http://localhost:8000/api/cards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirigir a la lista de tarjetas después de crearla
      navigate('/cards');
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
    }
  };

   // Nueva función para redirigir a la lista de tarjetas.
   const goToCardList = () => {
    navigate('/cards');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Tarjeta de Presentación</h1>

      {/* Campos del formulario */}
      <div className="mb-4">
        <label className="block font-bold mb-1">Nombre de la Empresa:</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Nombre de la Persona:</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Email:</label>
        <input 
          type="email" 
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Teléfono:</label>
        <input 
          type="tel" 
          className="w-full p-2 border border-gray-300 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Página Web:</label>
        <input 
          type="url" 
          className="w-full p-2 border border-gray-300 rounded"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Horario de Atención:</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded"
          value={businessHours}
          onChange={(e) => setBusinessHours(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Promociones:</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded"
          value={promotions}
          onChange={(e) => setPromotions(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Enlaces a Redes Sociales:</label>
        <input 
          type="url" 
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Facebook"
          value={socialLinks.facebook}
          onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
        />
        <input 
          type="url" 
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Instagram"
          value={socialLinks.instagram}
          onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
        />
        <input 
          type="url" 
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="LinkedIn"
          value={socialLinks.linkedin}
          onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
        />
      </div>

      {/* Campo para subir imágenes */}
      <div className="mb-4">
        <label className="block font-bold mb-1">Subir Imágenes:</label>
        <input 
          type="file" 
          name="images"  // Asegúrate de que el campo de archivo tenga este nombre
          className="w-full p-2 border border-gray-300 rounded"
          multiple
          onChange={handleImageChange}
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-1">Footer:</label>
        <textarea 
          className="w-full p-2 border border-gray-300 rounded"
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
        />
      </div>

      {/* Botón para crear la tarjeta */}
      <button 
        onClick={handleSubmit} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Tarjeta
      </button>
      {/* Botón para ir a la lista de tarjetas */}
      <button 
        onClick={goToCardList} 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
      >
        Ver Lista de Tarjetas
      </button>
    </div>

    
  );
}

export default CreateCard;



