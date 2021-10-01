import { shade, transparentize } from 'polished';
import styled, { css } from 'styled-components';
import {
  featuredColor,
  primaryColor,
  secondaryBackground,
  secondaryColor,
  tertiaryColor,
  titleColor,
} from '../../styles/paletsColorers';

interface WarningPros {
  textColor?: string;
}

export const HeaderSection = styled.header`
  margin: 4px 0 8px 0;

  font-size: 32px;
  color: ${titleColor};

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

export const Main = styled.main`
  background: #fff;
  padding: 12px;
  border-radius: 0 0 24px 24px;
  margin-bottom: 100px;
`;

export const SectionLine = styled.section`
  max-width: 1200px;
  margin: 24px auto;

  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: ${tertiaryColor};
    transition: 0.3s;

    &:hover {
      color: ${shade(0.01, tertiaryColor)};
      text-decoration: underline;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 16px;
    margin-top: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      max-width: 950px;
      padding: 0 8px;

      header {
        margin-bottom: 8px;

        font-size: 24px;
        color: ${titleColor};
      }
    }

    aside {
      display: flex;
      flex-direction: column;

      img {
        flex-shrink: 0;

        & + img {
          margin-top: 32px;
        }

        height: 200px;
        width: 200px;
        border-radius: 50%;
        -webkit-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
        object-fit: cover;
      }
    }
  }
`;

export const ScheduleTable = styled.div`
  margin: 8px;
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    color: ${featuredColor};
    font-size: 24px;
    margin-bottom: 8px;
  }

  > div {
    border: 0.5px solid ${transparentize(0.5, featuredColor)};
    border-radius: 4px;
    /* padding: 8px; */
    width: 100%;

    > div {
      display: flex;
      /* padding: 8px 0; */

      > div {
        font-size: 18px;
        background-color: ${secondaryBackground};
        background-color: ${transparentize(0.8, featuredColor)};

        border: 0.5px solid ${transparentize(0.5, featuredColor)};
        border-radius: 4px;
        margin: 8px;
        padding: 8px;

        width: calc(50% - 16px);

        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
`;
