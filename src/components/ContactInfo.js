import React from 'react';

function ContactInfo({ email, phone, website }) {
  return (
    <section className="text-left text-center py-4">
      <p className="text-left text-lg text-gray-200"><span className="font-semibold">Email:</span> <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a></p>
      <p className="text-left text-lg text-gray-200"><span className="font-semibold">Teléfono:</span> <a href={`tel:${phone}`} className="text-blue-400 hover:underline">{phone}</a></p>
      <p className="text-left text-lg text-gray-200"><span className="font-semibold">Página Web:</span> <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{website}</a></p>
    </section>
  );
}

export default ContactInfo;

