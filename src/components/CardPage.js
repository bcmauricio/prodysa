import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Preview from './Preview';
import { useParams } from 'react-router-dom';
import Footer from './Footer';

function CardPage() {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cards/${id}`);
        console.log("Datos recuperados:", response.data);  // Depuración para ver los datos completos
        setCardData(response.data);
      } catch (error) {
        console.error('Error al recuperar la tarjeta:', error);
      }
    };

    fetchCard();
  }, [id]);

  if (!cardData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Preview 
        companyName={cardData.companyName}
        personName={cardData.personName}
        email={cardData.email}
        phone={cardData.phone}
        website={cardData.website}
        businessHours={cardData.businessHours}
        promotions={cardData.promotions}
        socialLinks={cardData.socialLinks}
        images={cardData.images}
        footer={cardData.footer}  // Pasar el contenido del footer al Preview
      />
      
      {/* Solo renderiza el footer si existe */}
      <Footer content={cardData.footer || ''} />
    </div>
  );
}

export default CardPage;



