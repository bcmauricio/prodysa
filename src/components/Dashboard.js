import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de tener Axios instalado con `npm install axios`
import Preview from './Preview';

function Dashboard() {
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
  
  const [images, setImages] = useState([]);
  const [footer, setFooter] = useState('');
  const [cardURL, setCardURL] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/cards', {
        companyName,
        personName,
        email,
        phone,
        website,
        businessHours,
        promotions,
        socialLinks,
        images,
        footer  // Incluir el contenido del footer en los datos enviados
      });

      const id = response.data.id;
      setCardURL(`http://localhost:3000/card/${id}`);
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Tarjeta de Presentación</h1>
      
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

      {/* Aquí puedes agregar un input para subir imágenes */}
      <div className="mb-4">
        <label className="block font-bold mb-1">Subir Imágenes:</label>
        <input 
          type="file" 
          multiple 
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setImages([...images, ...Array.from(e.target.files).map(file => URL.createObjectURL(file))])}
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

      <button 
        onClick={handleSubmit} 
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Crear Tarjeta
      </button>

      {cardURL && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Vista Previa de la Tarjeta</h2>
          <Preview 
            companyName={companyName}
            personName={personName}
            email={email}
            phone={phone}
            website={website}
            businessHours={businessHours}
            promotions={promotions}
            socialLinks={socialLinks}
            images={images}
            cardURL={cardURL}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;


