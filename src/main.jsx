import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos/tienda.css'; 

// --- IMPORTS DE PÁGINAS PÚBLICAS ---
import NavBarra from './pages/tienda/Navbarra.jsx'
import HomePage from './pages/tienda/HomePage.jsx';
import Footer from './pages/tienda/Footer.jsx';
import ProductosPage from './pages/tienda/Productos.jsx';
import Nosotros from './pages/tienda/Nosotros.jsx';
import Blogs from './pages/tienda/Blogs.jsx';
import Contactos from './pages/tienda/Contactos.jsx';
import Inicio_sesion from './pages/tienda/Inicio_sesion.jsx';
import Registro from './pages/tienda/Registro.jsx';
import Checkout from './pages/tienda/Checkout.jsx';
import CompraExitosa from './pages/tienda/CompraExitosa.jsx';
import CompraFallida from './pages/tienda/CompraFallida.jsx';
import Categorias from './pages/tienda/Categorias.jsx';

// --- IMPORTS DE PÁGINAS DE ADMINISTRADOR ---
import AdminDashboard from './pages/tienda/AdminDashboard.jsx';
import AdminProductos from './pages/tienda/AdminProductos.jsx';
import AdminOrdenes from './pages/tienda/AdminOrdenes.jsx';
import AdminGestionProductos from './pages/tienda/AdminGestionProductos.jsx';
import AdminUsuarios from './pages/tienda/AdminUsuarios.jsx';

// --- CONTEXTO Y ROUTER ---
import { AppContextProvider } from './context/AppContextProvider.jsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const MainApp = () => {
  const location = useLocation();

  // --- LÓGICA DE VISIBILIDAD ---
  
  // 1. Ocultar Barra SIEMPRE en rutas de administrador
  const esRutaAdmin = location.pathname.startsWith('/admin') || location.pathname === '/administrador';
  
  // 2. Rutas donde NO queremos barra (Ahora está vacío para que aparezca en Login/Registro)
  const rutasSinBarra = []; 
  // Si quisieras ocultarla de nuevo en el futuro, agregas las rutas aquí: ['/inicio_sesion']
  
  // Decisión final: Mostrar barra si no es admin y no está en la lista negra
  const mostrarBarra = !rutasSinBarra.includes(location.pathname) && !esRutaAdmin;

  return (
    <div id="root">
      
      {/* Barra Pública */}
      {mostrarBarra && <NavBarra/>}
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/inicio_sesion" element={<Inicio_sesion/>} />
          <Route path="/categorias" element={<Categorias/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/productos" element={<ProductosPage/>} />
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/contactos" element={<Contactos/>}/>
          
          {/* --- RUTAS DE COMPRA --- */}
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/compra-exitosa" element={<CompraExitosa/>} />
          <Route path="/compra-fallida" element={<CompraFallida/>} />
          
          {/* --- RUTAS DE ADMINISTRADOR --- */}
          <Route path="/administrador" element={<AdminDashboard/>} />
          <Route path="/admin/agregar-producto" element={<AdminProductos/>} />
          <Route path="/admin/ordenes" element={<AdminOrdenes/>} />
          <Route path="/admin/productos/gestionar" element={<AdminGestionProductos/>} />
          <Route path="/admin/usuarios" element={<AdminUsuarios/>} />
        </Routes>
      </div>
      
      {/* Footer Público */}
      {mostrarBarra && <Footer/>}
      
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
        <BrowserRouter> 
            <MainApp/>
        </BrowserRouter>
    </AppContextProvider>
  </StrictMode>
);