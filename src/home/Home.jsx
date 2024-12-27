import React from 'react';
import ImageSlider from './ImageSlider';
import Products from '../products/Products';

const Home = () => {
  const imageUrls = [
    'https://www.dropbox.com/scl/fi/k6vz9r05u3p1miv25fxe1/desc1.jpg?rlkey=8ddl4x7xkkfzgvthv2s1jp914&st=fhiuw1xi&dl=0&raw=1',
    'https://www.dropbox.com/scl/fi/glmhv748a90nzgfo78zvr/desc2.png?rlkey=ryv95q1efq01l6ot3hp523fqr&st=4o71ubi6&dl=0&raw=1'
  ]

  return (
    <div>
        <ImageSlider images={imageUrls} />
        <Products></Products>
    </div>
  );
};

export default Home;
