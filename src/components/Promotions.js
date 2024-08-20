import React from 'react';

function Promotions({ promotions }) {
  return (
    <div>
      <h3 className="font-bold">Promociones:</h3>
      <p>{promotions}</p>
    </div>
  );
}

export default Promotions;
