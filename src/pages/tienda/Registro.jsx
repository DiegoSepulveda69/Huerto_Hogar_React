import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContextProvider'; 

const MIN_PASSWORD_LENGTH = 8; 

const REGIONES_DATA = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Cartagena", "El Quisco", "Algarrobo", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llay-Llay", "Panquehue", "Putaendo", "Santa María", "Villa Alemana", "Limache", "Olmué", "Quilpué"],
    "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Gualañé", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén ": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Chile Chico", "Río Ibáñez", "Cochrane", "O'Higgins", "Tortel"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

function Registro() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        region: '',
        comuna: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { setUsuarioLogueado } = useContext(AppContext); 

    useEffect(() => {
        document.body.classList.add('registro');
        return () => {
            document.body.classList.remove('registro');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleRegionChange = (e) => {
        setFormData(prev => ({
            ...prev,
            region: e.target.value,
            comuna: '' 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (formData.email !== formData.confirmEmail) {
            setError('Los correos electrónicos no coinciden.');
            setIsLoading(false); return;
        }
        if (formData.password.length < MIN_PASSWORD_LENGTH) {
            setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`);
            setIsLoading(false); return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setIsLoading(false); return;
        }

        try {
            const usuarioParaBackend = {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                telefono: formData.telefono, 
                region: formData.region,
                comuna: formData.comuna
            };

            const response = await axios.post('http://localhost:8080/api/v1/auth/register', usuarioParaBackend);

            const { token, usuario } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            
            const rolUsuario = (usuario?.role || 'cliente').toLowerCase();
            
            const userData = { 
                id: usuario?.id,
                nombre: usuario?.nombre || 'Usuario', 
                email: usuario?.email,
                rol: rolUsuario,
                telefono: usuario?.telefono,
                region: usuario?.region,
                comuna: usuario?.comuna
            };
            setUsuarioLogueado(userData);

            setSuccess('¡Cuenta creada con éxito! Entrando...');
            
            setTimeout(() => {
                navigate('/'); 
            }, 1500);

        } catch (err) {
            console.error("Error al registrar:", err);
            if (err.response) {
                setError('Hubo un error al registrar. Es posible que el correo ya exista.');
            } else if (err.request) {
                setError('No se pudo conectar con el servidor. Revisa si Spring Boot está encendido.');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="formulario-page-wrapper"> 
            <form className="formulario" onSubmit={handleSubmit}>
                <section className="seccion-informacion">
                    <h2>Registro</h2>
                    
                    {error && (<div className="alert alert-danger">{error}</div>)}
                    {success && (<div className="alert alert-success">{success}</div>)}

                    <div className="inputs">
                        <input type="text" placeholder="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        
                        <input type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} required />
                        
                        <input type="email" placeholder="Confirmar correo electrónico" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required />
                        
                        <input type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} required />
                        
                        <input type="password" placeholder="Confirmar contraseña" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        
                        <input type="tel" placeholder="Teléfono (opcional)" name="telefono" value={formData.telefono} onChange={handleChange} />
                        
                        <select id="region" name="region" value={formData.region} onChange={handleRegionChange} required>
                            <option value="" disabled>Región</option>
                            {Object.keys(REGIONES_DATA).map(regionNombre => (
                                <option key={regionNombre} value={regionNombre}>{regionNombre}</option>
                            ))}
                        </select>
                        
                        <select id="comuna" name="comuna" value={formData.comuna} onChange={handleChange} required disabled={!formData.region}>
                            <option value="" disabled>Comuna</option>
                            {formData.region && REGIONES_DATA[formData.region].map(comunaNombre => (
                                <option key={comunaNombre} value={comunaNombre}>{comunaNombre}</option>
                            ))}
                        </select>
                    </div>
                </section>
                
                <section className="seccion-botones">
                    <button type="submit" className="button" disabled={isLoading}>
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                    <p>¿Ya tienes una cuenta? <Link to="/inicio_sesion">Iniciar sesión</Link></p>
                </section>
            </form>
        </div>
    );
}

export default Registro;