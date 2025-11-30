import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContextProvider';

function AdminDashboard() {
  const { setUsuarioLogueado } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiamos el usuario del contexto para cerrar sesión
    setUsuarioLogueado(null);
    navigate('/inicio_sesion');
  };

  return (
    <div className="admin-layout">
      {/* --- BARRA LATERAL (SIDEBAR) --- */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h3>Huerto Hogar</h3>
          <small>Panel Administrativo</small>
        </div>

        <nav className="sidebar-menu">
          {/* Enlaces de navegación lateral */}
          <Link to="/administrador" className="menu-item active">📊 Dashboard</Link>
          <Link to="/admin/ordenes" className="menu-item">🛒 Órdenes</Link>
          <Link to="/admin/agregar-producto" className="menu-item">📦 Productos</Link>
          <Link to="/admin/categorias" className="menu-item">🏷️ Categorías</Link>
          <Link to="/admin/usuarios" className="menu-item">👥 Usuarios</Link>
          <Link to="/admin/reportes" className="menu-item">📈 Reportes</Link>
        </nav>

        <div className="sidebar-footer">
            <Link to="/" className="btn-tienda">🏪 Ver Tienda</Link>
            <button onClick={handleLogout} className="btn-logout">🚪 Cerrar Sesión</button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL (DERECHA) --- */}
      <main className="admin-content">
        <header className="admin-header">
            <h2>Dashboard</h2>
            <p className="text-muted">Resumen de las actividades diarias</p>
        </header>

        {/* 1. TARJETAS DE ESTADÍSTICAS (Las de colores) */}
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

        {/* 2. TARJETAS DE ACCESO RÁPIDO (Las blancas) */}
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
                <h4>Productos</h4>
                <p>Administrar inventario y detalles.</p>
            </Link>

            <Link to="/admin/categorias" className="quick-card">
                <span className="icon">🏷️</span>
                <h4>Categorías</h4>
                <p>Organizar productos para facilitar navegación.</p>
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