"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phone: string; // Número de WhatsApp en formato internacional (ej: "50760000000")
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phone }) => {
  const whatsappUrl = `https://wa.me/${phone}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:hidden bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      aria-label="Chat en WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
