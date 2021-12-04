import styled, { css } from 'styled-components';

import { transparentize } from 'polished';
import {
  secondaryBackground,
  titleColor,
  primaryColor,
  tertiaryColor,
  featuredColor,
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
    /* border-bottom: 1px solid ${titleColor}; */

    font-size: 32px;
    color: ${titleColor};

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  /* align-items: center; */
  padding: 16px;

  width: 100%;
  height: 100vh;
  overflow: auto;

  form {
    border-radius: 8px;

    background: #fff;
    padding: 16px;
    margin-bottom: 40px;

    header {
      width: 100%;
      font-size: 28px;
    }

    .input-form {
      -webkit-box-shadow: 0px 0px 2px 0px rgba(138, 138, 138, 1);
      -moz-box-shadow: 0px 0px 2px 0px rgba(138, 138, 138, 1);
      box-shadow: 0px 0px 2px 0px rgba(138, 138, 138, 1);
    }
  }
`;

export const Section = styled.section<SectionProps>`
  /* border: 1px solid red; */
  border-radius: 8px;
  padding: 12px;
  margin: 24px auto;
  width: 100%;
  transition: 0.3s all;
  border: 1px solid ${secondaryBackground};
  background: white;

  header {
    display: flex;
    flex-direction: column;

    svg {
      margin: 0 8px;
      transition: 0.3s all;
    }

    div {
      display: flex;
      align-items: center;

      width: 100%;

      h2 {
        font-family: 'Source Sans Pro';
        font-size: 28px;
        min-width: fit-content;
        font-weight: 500;
      }

      .bar {
        width: 100%;
        margin: 0 12px;
      }
    }

    p {
      font-family: 'Source Sans Pro';
      font-size: 18px;
      margin: 12px;
      padding-bottom: 12px;
      border-bottom: 3px solid ${secondaryBackground};
    }
  }

  > div {
    transition: 0.3s all;
    margin-top: 0px;
    margin-top: 12px;
    ${(props) =>
      props.height &&
      css`
        height: ${`${
          props.height * (114 + 16)
        }px`}; //114 Height of the Card + 16 margin
      `}

    ${(props) =>
      !props.isOpen &&
      css`
        overflow: hidden;
        height: 0;
      `}
  }

  &:hover {
    > header svg {
      color: ${tertiaryColor};
    }
  }
`;

export const Projects = styled.div`
  margin-top: 80px;
  max-width: 1200px;
  margin: 24px auto;

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
    height: 114px;

    display: flex;
    align-items: center;
    transition: all 0.2s;

    &:hover {
      background: ${transparentize(0.00001, secondaryBackground)};

      -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);

      transform: translateX(8px);
    }

    img {
      min-width: 64px;
      min-height: 64px;
      max-width: 64px;
      max-height: 64px;
      border-radius: 50%;
      display: flex;
      flex-shrink: 1;
    }

    strong {
      min-width: 210px;
      margin: 0 16px;
      min-height: 88px;

      flex: 1;
      display: flex;
      flex-direction: column;

      align-items: baseline;

      font-size: 20px;
      color: ${primaryColor};

      span {
        margin-top: 4px;

        font-size: 14px;
        color: ${transparentize(0.35, primaryColor)};

        svg {
          margin-right: 4px;
          color: ${transparentize(0.35, primaryColor)};
        }
      }
    }

    p {
      width: 100%;
      margin-top: 4px;

      font-size: 18px;
      color: #a8a8b3;
    }

    div {
      min-height: 88px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      padding-right: 16px;

      span {
        margin-top: -20px;
        margin-bottom: 20px;
      }

      color: ${primaryColor};
      font-family: 'Dosis';
      font-weight: 200;
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }

    button {
      font-size: 12px;
      height: auto;
      width: fit-content;
      padding: 4px;
    }
  }
`;

export const ModalResetPassowrd = styled.div`
  z-index: 2000;
  position: absolute;
  height: 100vh;
  width: 100vw;

  background: ${transparentize(0.5, featuredColor)};

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    /* margin: auto; */
    max-width: 500px;
    padding: 8px;
    background: ${secondaryBackground};
    border-radius: 8px;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      font-size: 28px;
    }

    main {
      display: flex;
      flex-direction: column;
      p {
        font-size: 20px;
      }
      padding: 8px 0;
    }

    footer {
      margin-top: 16px;
      display: flex;

      button {
        margin: 0 4px;
        height: auto;
        font-size: 18px;
      }
    }
  }
`;
