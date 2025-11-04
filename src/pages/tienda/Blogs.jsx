import frutas_img from '../../assets/blog_img_frutas.webp';
import refugio_img from '../../assets/blog_img_refugio.jpg';

function Blogs(){
  return(
  <>
    <nav className="bg-dark text-white text-center py-5">
      <div className="container">
        <h2 className="display-4">Noticias</h2>
      </div>
  </nav>  

  <div className="container-fluid py-5 fondo-principal">
    <div className="noticia-card mb-5 d-flex flex-column flex-md-row align-items-center">
      <div className="noticia-texto me-md-4 mb-3 mb-md-0">
        <h3>Llega toda la variedad de la primavera</h3>
        <p>
          Llega la primavera con toda su variedad de frutas y verduras. Acá podrás ver todos los nuevos productos que traen nuestros socios.
        </p>
        <button type="submit" className="btn btn-outline-dark px-4">VER MÁS</button>
      </div>
      <div className="noticia-img">
        <img src={frutas_img} alt="imagen noticia 1" className="img-fluid rounded"/>
      </div>
    </div>

    <div className="noticia-card d-flex flex-column flex-md-row align-items-center">
      <div className="noticia-texto me-md-4 mb-3 mb-md-0">
        <h3>Colaboración con fundación de animales sin hogar</h3>
        <p>
          Huerto Hogar se mantiene comprometido con el cuidado del medio ambiente y la fauna local. Revisa nuestra colaboración con los refugios de animales para cuidar la flora y fauna silvestre.
        </p>
        <button type="submit" className="btn btn-outline-dark px-4">VER MÁS</button>
      </div>
      <div className="noticia-img">
        <img src={refugio_img} alt="imagen noticia 2" className="img-fluid rounded"/>
      </div>
    </div>
  </div>
  </>
  );
};

export default Blogs;