import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import nosotros_img from '../../assets/sobre_nosotros_campo.webp';
import fondo_img from '../../assets/fondo.jpg';
import '../../estilos/tienda.css';

function Nosotros() {
  return (
  <>

  <nav className="bg-dark text-white text-center py-5">
    <div className="container">
      <h2 className="display-4">Sobre Nosotros</h2>
    </div>
  </nav>

  <section className="py-5 fondo-principal" >
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img src={nosotros_img} className="img-fluid rounded shadow" alt="Nuestra historia"/>
        </div>
        <div className="col-md-6">
          <h2>¿Qué es Huerto Hogar?</h2>
          <p>
            HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt, Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Nuestra misión es conectar a las familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section className="bg-dark text-white py-5">
    <div className="container text-center">
      <h2 className="mb-4">Misión & Valores</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Misión</h4>
          <p>Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en todos los hogares chilenos.</p>
        </div>
        <div className="col-md-6">
          <h4>Visión</h4>
          <p>Nuestra visión es ser la tienda online líder en la distribución de productos frescos y naturales en Chile, reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional, estableciendo un nuevo estándar en la distribución de productos agrícolas directos del productor al consumidor.</p>
        </div>
      </div>
    </div>
  </section>

  </>
  );
}

export default Nosotros;