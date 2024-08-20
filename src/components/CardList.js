import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CardList() {
  const [cards, setCards] = useState([]);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error);
      }
    };

    fetchCards();
  }, []);

  // Función para eliminar la tarjeta
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarjeta?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/cards/${id}`);
        setCards(cards.filter(card => card._id !== id));  // Remover la tarjeta eliminada del estado
      } catch (error) {
        console.error('Error al eliminar la tarjeta:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Tarjetas</h1>
      {cards.map(card => (
        <div key={card._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold">{card.companyName}</h2>
          <p>{card.personName}</p>
          <p>{card.email}</p>
          <p>{card.phone}</p>

          <div className="flex space-x-4">
            {/* Enlace para ver la tarjeta */}
            <Link to={`/card/${card._id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Ver
            </Link>

            {/* Enlace para editar la tarjeta */}
            <Link to={`/edit/${card._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Editar
            </Link>

            {/* Botón para eliminar la tarjeta */}
            <button
              onClick={() => handleDelete(card._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardList;




