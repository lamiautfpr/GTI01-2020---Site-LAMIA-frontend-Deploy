import styled, { css } from 'styled-components';

import { transparentize, shade } from 'polished';
import {
  secondaryBackground,
  primaryColor,
  secondaryColor,
  tertiaryColor,
} from '../../styles/paletsColorers';

interface SectionProps {
  isOpen?: boolean;
  height: number;
}

export const Main = styled.main`
  background: #fff;
  padding: 12px;
  border-radius: 0 0 24px 24px;
  margin-bottom: 100px;
`;

export const Section = styled.section<SectionProps>`
  /* border: 1px solid red; */
  border-radius: 8px;
  padding: 12px;
  margin: 24px auto;
  max-width: 1200px;
  width: 100%;
  transition: 0.3s all;
  border: 1px solid ${secondaryBackground};

  ${(props) =>
    !props.isOpen &&
    css`
      background: ${secondaryBackground};
    `}

  header {
    display: flex;
    flex-direction: column;
    color: #a8a8b3;
    cursor: pointer;

    ${(props) =>
      props.isOpen &&
      css`
        color: ${tertiaryColor};
      `}

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
      font-weight: 600;
      line-height: 28px;
      color: ${shade(0.24, '#a8a8b3')};
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
        height: ${`${props.height * 145}px`};
      `}

    ${(props) =>
      !props.isOpen &&
      css`
        overflow: hidden;
        height: 0;
      `}
  }

  &:hover {
    > header svg,
    h2 {
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
      margin-right: 16px;
      width: 100%;

      font-size: 18px;
      color: #a8a8b3;
    }

    div {
      min-height: 88px;

      display: flex;
      flex-direction: column;
      justify-content: center;

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
  }
`;

export const CardWarning = styled.div`
  max-width: 1200px;

  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    display: flex;
    flex-direction: column;

    font-size: 40px;
    font-family: 'Dosis';
    color: ${secondaryColor};
    /* text-transform: uppercase; */
  }

  img {
    border-radius: 50%;
    width: 120px;
    margin-left: 40px;
  }
`;
