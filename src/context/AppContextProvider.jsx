import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    // 1. ESTADO DEL USUARIO
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    // 2. ESTADO DEL CARRITO (Global)
    const [carrito, setCarrito] = useState([]);

    // Persistencia del usuario (opcional, ya lo tenías)
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) setUsuarioLogueado(JSON.parse(usuarioGuardado));
    }, []);

    useEffect(() => {
        if (usuarioLogueado) localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));
        else localStorage.removeItem('usuario');
    }, [usuarioLogueado]);

    // --- FUNCIONES DEL CARRITO (Las movimos aquí) ---
    const agregarACarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find(item => item.producto_id === producto.producto_id);
            if (existe) {
                return prev.map(item => item.producto_id === producto.producto_id 
                    ? { ...item, cantidad: item.cantidad + 1 } : item);
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(prev => prev.filter(item => item.producto_id !== id));
    };

    const actualizarCantidad = (id, cantidad) => {
        if (cantidad < 1) return;
        setCarrito(prev => prev.map(item => 
            item.producto_id === id ? { ...item, cantidad: cantidad } : item
        ));
    };

    const vaciarCarrito = () => setCarrito([]);

    const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio_producto * item.cantidad), 0);

    return (
        <AppContext.Provider value={{ 
            usuarioLogueado, setUsuarioLogueado,
            carrito, agregarACarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, totalCarrito 
        }}>
            {children}
        </AppContext.Provider>
    );
};



