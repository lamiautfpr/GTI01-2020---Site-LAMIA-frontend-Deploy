import styled from 'styled-components';
import { primaryColor } from '../../styles/paletsColorers';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: ${primaryColor};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-family: 'Source Sans Pro';
    font-weight: 700;
    opacity: 0;
    transition: 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 100%;
    transform: translateX(-100%);
    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: ${primaryColor} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 95%;
      transform: translateX(-95%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
