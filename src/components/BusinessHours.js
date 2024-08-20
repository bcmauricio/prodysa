import React from 'react';

function BusinessHours({ businessHours }) {
  return (
    <div>
      <h3 className="font-bold">Horario de Atención:</h3>
      <p>{businessHours}</p>
    </div>
  );
}

export default BusinessHours;
