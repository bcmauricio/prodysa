import React from 'react';

function Header({ companyName, personName }) {
  return (
    <header className="text-center py-6">
      <img src="/logo.png" alt="Company Logo" className="mx-auto w-20 mb-4" />
      <h1 className="text-4xl font-extrabold text-white tracking-wide">{companyName}</h1>
      <h2 className="text-2xl font-medium text-gray-300 mt-2">{personName}</h2>
    </header>
  );
}

export default Header;

