import { shade } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logoHeader.jpg';
import {
  featuredColor,
  secondaryBackground,
  tertiaryColor,
} from '../../styles/paletsColorers';

export const Title = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px 80px 16px 80px;

  .img {
    width: 120px;
    height: 120px;
    background: url(${logo});
    border-radius: 50%;
    background-size: cover;
  }

  img {
    max-width: 120px;
    max-height: 120px;
    min-width: 64px;
    min-height: 64px;
    border-radius: 50%;
  }

  h1 {
    margin: 4px 0 8px 0;
    font-size: 48px;
    color: #fff;
    font-weight: 300;
  }

  p {
    /* max-width: 600px; */
    font-size: 24px;
    text-align: center;
    font-weight: 300;
    /* margin: 60px auto; */
    color: #fff;

    ::after {
      content: '|';
      opacity: 1;
      margin-left: -12px;
      display: inline-block;
      animation: blink 0.7s infinite;
    }

    @keyframes blink {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
  }

  span {
    color: #fff;
    font-weight: 300;

    display: block;
    margin-top: 4px;

    font-size: 20px;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    padding: 8px;

    border-radius: 4px;
    /* background-color: ${featuredColor}; */

    font-size: 24px;
    text-align: center;
    font-weight: 300;
    color: #fff;
  }
`;

export const Button = styled(Link)`
  text-decoration: none;
  background-color: ${tertiaryColor};
  margin: 8px;
  padding: 8px;
  border-radius: 4px;
  color: ${secondaryBackground};
  transition: all 0.2s;

  &:hover {
    background: ${shade(0.1, tertiaryColor)};
  }
`;
