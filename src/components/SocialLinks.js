import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function SocialLinks({ socialLinks }) {
  const { facebook, instagram, linkedin } = socialLinks;

  // Función para verificar y agregar "http://" si falta
  const formatLink = (url) => {
    if (url && !/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  return (
    <div className="flex justify-center space-x-4">
      {facebook && (
        <a href={formatLink(facebook)} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl hover:text-blue-500" />
        </a>
      )}
      {instagram && (
        <a href={formatLink(instagram)} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl hover:text-pink-500" />
        </a>
      )}
      {linkedin && (
        <a href={formatLink(linkedin)} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="text-white text-2xl hover:text-blue-700" />
        </a>
      )}
    </div>
  );
}

export default SocialLinks;




