import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBarra from './pages/tienda/Navbarra.jsx'
import HomePage from './pages/tienda/HomePage.jsx';
import Footer from './pages/tienda/Footer.jsx';
import ProductosPage from './pages/tienda/Productos.jsx';
import Nosotros from './pages/tienda/Nosotros.jsx';
import Blogs from './pages/tienda/Blogs.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const MainApp =() => (
  <>
    <NavBarra/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/productos" element={<ProductosPage/>} />
      <Route path="/nosotros" element={<Nosotros/>} />
      <Route path="/blogs" element={<Blogs/>}/>
    </Routes>
    <Footer/>
  </>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
        <MainApp/>
    </BrowserRouter>
  </StrictMode>
);
