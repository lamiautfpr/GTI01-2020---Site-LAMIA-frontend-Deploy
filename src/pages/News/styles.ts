import styled from 'styled-components';
import { transparentize } from 'polished';
import {
  secondaryBackground,
  primaryColor,
  tertiaryColor,
  secondaryColor,
} from '../../styles/paletsColorers';

export const Main = styled.main`
  background: #fff;
  padding: 12px;
  border-radius: 0 0 24px 24px;
  margin-bottom: 100px;
  padding: 1px 20px;
  padding-bottom: 32px;
  h1 {
    font-family: Dosis;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    margin: 30px 0;
    line-height: 60px;
    text-align: center;

    color: ${secondaryColor};
  }
  p.info {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    white-space: pre-line;
    span {
      color: ${secondaryColor};
    }
  }

  p {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
  }
  a {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;

    color: ${primaryColor};
    transition: 0.3s ease;
  }
  a:hover {
    transform: translateX(8px);
    color: ${tertiaryColor};
  }
`;

export const Cover = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  div.line {
    width: 80%;

    border: 1px solid ${primaryColor};
  }
  img {
    box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    width: max-content;
    max-width: 400px;
    object-fit: contain;
    margin: 30px 0px;
  }
`;

export const ShelfGallery = styled.div`
  max-width: 1200px;
  margin: 12px auto;
  .react-photo-gallery--gallery {
    > div {
      justify-content: center;
    }
  }
  img {
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    transition: 0.3s;
    -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    &:hover {
      background: ${transparentize(0.00001, secondaryBackground)};
      -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      transform: translateY(8px);
    }
  }
`;
export const HeaderSection = styled.header`
  margin: 4px 0 24px 0;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  margin-top: 20px;
  color: ${primaryColor};

  &::after {
    content: '';

    width: 224px;
    height: 2px;
    background-image: -webkit-linear-gradient(
      180deg,
      ${primaryColor} 15%,
      ${secondaryColor} 85%
    );

    position: absolute;
  }
`;
