// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Agregar información adicional
    const enrichedData = {
      ...formData,
      origen: 'Sitio Web Corporativo',
      pagina: request.headers.get('referer') || 'Desconocida',
      fecha: new Date().toLocaleString('es-ES'),
      /* ip: request. || request.headers.get('x-forwarded-for') || 'Desconocida', */
      userAgent: request.headers.get('user-agent') || 'Desconocido'
    };

    // Enviar a FormSubmit
    const formsubmitResponse = await fetch('https://formsubmit.co/ajax/bakeralvarezcorporation@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(enrichedData)
    });

    if (!formsubmitResponse.ok) {
      throw new Error('Error al enviar el formulario');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { error: 'Error al procesar el formulario' },
      { status: 500 }
    );
  }
}