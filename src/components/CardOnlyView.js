import React from 'react';
import Header from './Header';
import ContactInfo from './ContactInfo';
import BusinessHours from './BusinessHours';
import ImageGallery from './ImageGallery';
import Promotions from './Promotions';
import SocialLinks from './SocialLinks';
import Footer from './Footer';

function CardOnlyView({ companyName, personName, email, phone, website, businessHours, promotions, socialLinks, images }) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-2xl rounded-xl p-8 max-w-md mx-auto border-4 border-gray-500">
      <Header companyName={companyName} personName={personName} />
      <hr className="my-6 border-t-2 border-gray-400" />
      <ContactInfo email={email} phone={phone} website={website} />
      <BusinessHours businessHours={businessHours} />
      <ImageGallery images={images} />
      <Promotions promotions={promotions} />
      <SocialLinks socialLinks={socialLinks} />
      <Footer />
    </div>
  );
}

export default CardOnlyView;
