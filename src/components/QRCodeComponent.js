import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function QRCodeComponent({ cardURL }) {
  return (
    <div className="flex flex-col items-center py-4">
      <h3 className="font-bold mb-2">Escanea para ver la Tarjeta:</h3>
      <QRCodeCanvas value={cardURL} size={128} className="mx-auto" />
    </div>
  );
}

export default QRCodeComponent;

