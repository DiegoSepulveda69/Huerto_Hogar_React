import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../assets/exampleCarouselImage';
import imagenSlide1 from '../../assets/carousel1.jpg';
import imagenSlide2 from '../../assets/carousel2.jpg';
import imagenSlide3 from '../../assets/carousel3.jpg';

function HomePage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <ExampleCarouselImage src={imagenSlide1} text="First slide" />
        <Carousel.Caption>
          <h3>Productos Orgánicos</h3>
          <p>La buena nutrición es nuestro principal enfoque.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={imagenSlide2} text="Second slide" />
        <Carousel.Caption>
          <h3>Trabajo Independiente</h3>
          <p>Trabajo coordinado con Pymes de distintos sectores.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={imagenSlide3} text="Third slide" />
        <Carousel.Caption>
          <h3>Variedad</h3>
          <p>
            Presentamos lo mejor de cada temporada.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomePage;