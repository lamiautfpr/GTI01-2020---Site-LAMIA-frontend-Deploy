import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Container } from './styles';

const Slider: React.FC = ({ children }) => (
  <Container>
    <AwesomeSlider className="slider-lamia">{children}</AwesomeSlider>
  </Container>
);

export default Slider;
