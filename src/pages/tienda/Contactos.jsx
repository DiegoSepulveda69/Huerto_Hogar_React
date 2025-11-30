import React, { useState } from 'react';

function Contacto() {

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Datos enviados:', formData);

        setSuccessMessage('¡Mensaje enviado correctamente! Gracias por contactarnos.');

        setFormData({ nombre: '', correo: '', mensaje: '' });

        setTimeout(() => setSuccessMessage(''), 5000);
    };

    return (
        <>
            

            <div className="container mt-5 pt-3">
                <h1 className="display-5 fw-bold text-center mb-5" style={{ color: "var(--title)" }}>
                    Contáctanos
                </h1>
            </div>


            <div className="container pt-5 text-center"> 
                <div className="card shadow mx-auto mb-5" style={{ maxWidth: '500px' }}>

                    <div className="card-header bg-light fw-bold text-center">
                        FORMULARIO DE CONTACTO
                    </div>

                    <div className="card-body">

                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3 text-start">
                                <label htmlFor="nombre" className="form-label small fw-bold">NOMBRE COMPLETO</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingrese su nombre completo"
                                    required
                                    value={formData.nombre} 
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className="mb-3 text-start">
                                <label htmlFor="correo" className="form-label small fw-bold">CORREO</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="correo"
                                    name="correo"
                                    placeholder="Ingrese su correo electrónico"
                                    required
                                    value={formData.correo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3 text-start">
                                <label htmlFor="mensaje" className="form-label small fw-bold">MENSAJE</label>
                                <textarea
                                    className="form-control"
                                    id="mensaje"
                                    name="mensaje"
                                    rows="4"
                                    placeholder="Escriba su mensaje aquí..."
                                    required
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-dark px-4">ENVIAR MENSAJE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contacto;