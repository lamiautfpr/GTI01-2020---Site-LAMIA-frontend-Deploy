import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { Container } from './styles';

interface ISliderProps {
  className?: string;
}

const Slider: React.FC<ISliderProps> = ({ children, className = '' }) => (
  <Container className={className}>
    <AwesomeSlider className="slider-lamia">{children}</AwesomeSlider>
  </Container>
);

export default Slider;
