import React from 'react';

function Footer({ content }) {
  // Mostrar contenido solo si no es una cadena vacía o null
  if (!content || content.trim() === '') {
    return null; // No renderiza nada si no hay contenido
  }

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      {content}
    </footer>
  );
}

export default Footer;
