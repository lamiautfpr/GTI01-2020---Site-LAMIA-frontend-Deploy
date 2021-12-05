import { transparentize } from 'polished';
import styled from 'styled-components';
import { device } from '../../../styles/device';
import {
  primaryColor,
  secondaryBackground,
  titleColor,
} from '../../../styles/paletsColorers';

interface SectionProps {
  isOpen?: boolean;
  height: number;
}

export const Container = styled.div`
  display: flex;

  background: ${secondaryBackground};
`;

export const HeaderSection = styled.header`
  margin: 4px 0 8px 0;

  font-size: 32px;
  color: ${titleColor};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  width: 100%;
  height: 100vh;
  overflow: auto;

  header {
    width: 100%;
    font-size: 28px;
  }

  form {
    border-radius: 8px;

    background: #fff;
    padding: 16px;
    margin-bottom: 40px;

    .input-form,
    > div {
      -webkit-box-shadow: 0px 0px 2px 0px rgba(138, 138, 138, 1);
      -moz-box-shadow: 0px 0px 2px 0px rgba(138, 138, 138, 1);
      box-shadow: 0px 0px 2px 0px rgba(138, 138, 138, 1);
    }
  }
`;

export const Main = styled.main`
  border-radius: 8px;
  background: #fff;
  padding: 16px;

  display: flex;
  flex-direction: column;

  a {
    & + a {
      margin-top: 16px;
    }

    background: ${secondaryBackground};

    border-radius: 8px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    height: auto;

    display: flex;
    align-items: center;
    transition: all 0.2s;

    p {
      font-weight: 600;

      width: 100%;
      margin-top: 4px;

      font-size: 18px;
      color: #a8a8b3;
    }

    &:hover {
      background: ${transparentize(0.00001, secondaryBackground)};

      -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);

      transform: translateY(-8px);
    }
    > div {
      display: flex;
      flex-direction: row;

      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
      }

      strong {
        min-width: 210px;

        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: baseline;

        font-size: 20px;
        color: ${primaryColor};

        span {
          margin-top: 4px;

          font-size: 18px;
          color: ${transparentize(0.35, primaryColor)};

          svg {
            margin-right: 4px;
            color: ${transparentize(0.35, primaryColor)};
          }
        }
      }
    }

    @media ${device.laptopLL} {
      height: auto;
      flex-direction: column;

      > div {
        justify-content: center;
        align-items: center;
      }
      p {
        margin-top: 8px;
      }
    }
  }
`;
