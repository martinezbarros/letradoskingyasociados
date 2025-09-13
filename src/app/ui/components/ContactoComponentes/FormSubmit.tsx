'use client'

import React, { useState } from 'react'

export default function FormSubmit() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      //const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          // Enviar formulario a FormSubmit o directamente por mailto
          // Alternativa: usar FormSubmit (https://formsubmit.co/) para enviar a Gmail
          const form = e.target as HTMLFormElement;
          
          // Opción 1: Usar FormSubmit (recomendado)
          form.action = 'https://formsubmit.co/bufete.letradosyarquitectos@gmail.com';
          form.method = 'POST';
          
          // Agregar campos ocultos para configuración
          const redirectInput = document.createElement('input');
          redirectInput.type = 'hidden';
          redirectInput.name = '_next';
          redirectInput.value = window.location.origin + '/contacto/gracias';
          form.appendChild(redirectInput);
          
          const subjectInput = document.createElement('input');
          subjectInput.type = 'hidden';
          subjectInput.name = '_subject';
          subjectInput.value = `Nuevo mensaje de contacto: ${formData.subject}`;
          form.appendChild(subjectInput);
          
          // Enviar formulario
          form.submit();
          
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
          //setSubmitStatus('error');
          setIsSubmitting(false);
        }
      };
    
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo *
            </label>
            <input type="text" name="_honey" style={{display: "none"}}></input>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#16224F] focus:border-[#16224F] outline-none transition-colors"
            />
            </div>
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#16224F] focus:border-[#16224F] outline-none transition-colors"
            />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
            </label>
            <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#16224F] focus:border-[#16224F] outline-none transition-colors"
            />
            </div>
            <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Asunto *
            </label>
            <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#16224F] focus:border-[#16224F] outline-none transition-colors"
            >
                <option value="">Selecciona un asunto</option>
                <option value="consultation">Consulta</option>
                <option value="quote">Solicitud de presupuesto</option>
                <option value="other">Otro</option>
            </select>
            </div>
        </div>

        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje *
            </label>
            <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#16224F] focus:border-[#16224F] outline-none transition-colors"
            ></textarea>

            <input type="hidden" name="_captcha" value="false"></input>
        </div>

        <div>
            <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#16224F] border hover:border-[#16224F] cursor-pointer text-white py-3 px-4 rounded-md hover:bg-white hover:text-[#16224F] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
        </div>

    </form>
  )
}
