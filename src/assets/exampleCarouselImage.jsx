import React from 'react';

function ExampleCarouselImage({ src, text }) { 
  return (
    <img
      className="d-block w-100" 
      src={src}                 
      alt={text}                
      style={{ 
        height: '500px',        
        objectFit: 'cover'
      }}
    />
  );
}

export default ExampleCarouselImage;