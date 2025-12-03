import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContextProvider';

function AdminDashboard() {
  const { setUsuarioLogueado } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuarioLogueado(null);
    navigate('/inicio_sesion');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Huerto Hogar</h3>
          <small>Panel Administrativo</small>
        </div>

        <nav className="sidebar-menu">
          <Link to="/administrador" className="menu-item active">
            <span>📊</span> Dashboard
          </Link>
          <Link to="/admin/ordenes" className="menu-item">
            <span>🛒</span> Órdenes
          </Link>
          <Link to="/admin/agregar-producto" className="menu-item">
            <span>📦</span> Agregar Producto
          </Link>
          <Link to="/admin/categorias" className="menu-item">
            <span>🏷️</span> Categorías
          </Link>
          <Link to="/admin/usuarios" className="menu-item">
            <span>👥</span> Usuarios
          </Link>
          
          <Link to="/admin/productos/gestionar" className="menu-item">
            <span>📝</span> Gestionar Productos
          </Link>
          
        </nav>

        <div className="sidebar-footer">
            <Link to="/" className="btn-tienda">🏪 Ver Tienda</Link>
            <button onClick={handleLogout} className="btn-logout">🚪 Cerrar Sesión</button>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
            <h2>Dashboard</h2>
            <p className="text-muted">Resumen de las actividades diarias</p>
        </header>

        <section className="stats-grid">
            <div className="stat-card blue">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                    <h3>Compras</h3>
                    <h2>1,234</h2>
                    <small>Probabilidad de aumento: 20%</small>
                </div>
            </div>

            <div className="stat-card green">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                    <h3>Productos</h3>
                    <h2>400</h2>
                    <small>Inventario actual: 500</small>
                </div>
            </div>

            <div className="stat-card yellow">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                    <h3>Usuarios</h3>
                    <h2>890</h2>
                    <small>Nuevos usuarios este mes: 120</small>
                </div>
            </div>
        </section>

        <section className="quick-links-grid">
            <Link to="/administrador" className="quick-card">
                <span className="icon">📊</span>
                <h4>Dashboard</h4>
                <p>Visión general de todas las métricas.</p>
            </Link>

            <Link to="/admin/ordenes" className="quick-card">
                <span className="icon">🛒</span>
                <h4>Órdenes</h4>
                <p>Gestión y seguimiento de todas las órdenes.</p>
            </Link>

            <Link to="/admin/agregar-producto" className="quick-card">
                <span className="icon">📦</span>
                <h4>Agregar Producto</h4>
                <p>Añadir nuevos artículos al inventario.</p>
            </Link>

            <Link to="/admin/productos/gestionar" className="quick-card">
                <span className="icon">📝</span>
                <h4>Gestionar Productos</h4>
                <p>Editar, eliminar y revisar el catálogo completo.</p>
            </Link>
             
            <Link to="/admin/usuarios" className="quick-card">
                <span className="icon">👥</span>
                <h4>Usuarios</h4>
                <p>Gestión de cuentas de usuario y roles.</p>
            </Link>

            <Link to="/admin/reportes" className="quick-card">
                <span className="icon">📈</span>
                <h4>Reportes</h4>
                <p>Generación de informes detallados.</p>
            </Link>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;