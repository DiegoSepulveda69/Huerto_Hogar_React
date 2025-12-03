import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Necesitamos axios para hablar con el backend
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const REGIONES_DATA = {
    "Arica y Parinacota": ["Arica", "Putre"],
    "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Las Condes", "Maipú", "Providencia", "Renca", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar"]
};

function Checkout() {
  const { carrito, totalCarrito, usuarioLogueado, vaciarCarrito } = useContext(AppContext); 
  const navigate = useNavigate();
  
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [calle, setCalle] = useState('');
  const [dpto, setDpto] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [indicaciones, setIndicaciones] = useState('');
  const [procesando, setProcesando] = useState(false); 

  useEffect(() => {
    if (usuarioLogueado) {
        setEmail(usuarioLogueado.email || '');
        if (usuarioLogueado.nombre) {
            const nombreCompleto = usuarioLogueado.nombre.trim();
            const primerEspacio = nombreCompleto.indexOf(' ');
            if (primerEspacio === -1) {
                setNombre(nombreCompleto);
            } else {
                setNombre(nombreCompleto.substring(0, primerEspacio));
                setApellidos(nombreCompleto.substring(primerEspacio + 1));
            }
        }
    }
  }, [usuarioLogueado]);

  const handlePagar = async (e) => {
    e.preventDefault();
    setProcesando(true); 
    
    const codigoOrden = "ORDER" + Math.floor(Math.random() * 1000000);
    
    const ordenParaBackend = {
        codigoOrden: codigoOrden,
        total: totalCarrito,
        cliente: { nombre, apellidos, email },
        direccion: { calle, dpto, region, comuna, indicaciones },
        productos: carrito 
    };

   
    const ordenParaVista = { 
        ...ordenParaBackend, 
        numeroOrden: Math.floor(Math.random() * 10000) 
    };

    try {
     
        const token = localStorage.getItem('token');
        
        await axios.post('http://localhost:8080/api/ordenes/crear', ordenParaBackend, {
            headers: { Authorization: `Bearer ${token}` } 
        });

        console.log("Orden guardada en BD con éxito");
        vaciarCarrito(); 
        navigate('/compra-exitosa', { state: { orden: ordenParaVista } });

    } catch (error) {
        console.error("Error al procesar compra:", error);
        
       
        navigate('/compra-fallida', { state: { orden: ordenParaVista } });
    } finally {
        setProcesando(false);
    }
  };

  if (carrito.length === 0) {
      return (
          <Container className="my-5 text-center">
              <h3>Tu carrito está vacío 🛒</h3>
              <button className="btn btn-primary mt-3" onClick={() => navigate('/productos')}>Volver a la tienda</button>
          </Container>
      )
  }

  return (
    <Container className="my-5">
      <div className="bg-white p-5 shadow rounded" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h2 className="fw-bold text-secondary m-0">Resumen del pedido</h2>
          <div className="bg-primary text-white px-4 py-2 rounded fw-bold">
            Total a pagar: ${totalCarrito}
          </div>
        </div>

        <div className="table-responsive mb-5">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr><th>Producto</th><th>Precio</th><th>Cant.</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.producto_id}>
                  <td>{item.nombre_producto}</td>
                  <td>${item.precio_producto}</td>
                  <td>{item.cantidad}</td>
                  <td className="fw-bold text-success">${item.precio_producto * item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="fw-bold text-secondary mb-3 border-bottom pb-2">Información del cliente</h4>
        
        <form onSubmit={handlePagar}>
            <Row className="mb-3">
                <Col md={6}><label className="form-label small text-muted fw-bold">Nombre*</label><input type="text" className="form-control bg-light" value={nombre} onChange={e=>setNombre(e.target.value)} required /></Col>
                <Col md={6}><label className="form-label small text-muted fw-bold">Apellidos*</label><input type="text" className="form-control bg-light" value={apellidos} onChange={e=>setApellidos(e.target.value)} required /></Col>
            </Row>
            <div className="mb-4"><label className="form-label small text-muted fw-bold">Correo*</label><input type="email" className="form-control bg-light" value={email} onChange={e=>setEmail(e.target.value)} required /></div>

            <h4 className="fw-bold text-secondary mb-3 border-bottom pb-2">Dirección de entrega</h4>
            <Row className="mb-3">
                <Col md={8}><label className="form-label small text-muted fw-bold">Calle*</label><input type="text" className="form-control bg-light" value={calle} onChange={e=>setCalle(e.target.value)} required /></Col>
                <Col md={4}><label className="form-label small text-muted fw-bold">Depto</label><input type="text" className="form-control bg-light" value={dpto} onChange={e=>setDpto(e.target.value)} /></Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <label className="form-label small text-muted fw-bold">Región*</label>
                    <select className="form-select bg-light" value={region} onChange={(e) => {setRegion(e.target.value); setComuna('');}} required>
                        <option value="">Seleccione</option>
                        {Object.keys(REGIONES_DATA).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </Col>
                <Col md={6}>
                    <label className="form-label small text-muted fw-bold">Comuna*</label>
                    <select className="form-select bg-light" value={comuna} onChange={(e) => setComuna(e.target.value)} required disabled={!region}>
                        <option value="">Seleccione</option>
                        {region && REGIONES_DATA[region].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </Col>
            </Row>

            <div className="mb-4">
                <label className="form-label small text-muted fw-bold">Indicaciones (opcional)</label>
                <textarea className="form-control bg-light" rows="2" value={indicaciones} onChange={e=>setIndicaciones(e.target.value)}></textarea>
            </div>

            <div className="d-flex justify-content-end pt-3 gap-3">
                <button 
                    type="submit" 
                    className="btn btn-success btn-lg px-5 fw-bold shadow" 
                    style={{backgroundColor: '#198754'}}
                    disabled={procesando} 
                >
                    {procesando ? 'Procesando...' : `Pagar ahora $${totalCarrito}`}
                </button>
            </div>
        </form>
      </div>
    </Container>
  );
}

export default Checkout;