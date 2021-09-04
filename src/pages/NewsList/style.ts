/* eslint-disable @typescript-eslint/interface-name-prefix */
import { shade } from 'polished';
import styled, { css } from 'styled-components';
import {
  primaryColor,
  secondaryColor,
  tertiaryColor,
  titleColor,
} from '../../styles/paletsColorers';

interface ISelectPageProps {
  currentPage: number;
}

export const Container = styled.div``;

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

export const SectionsNews = styled.section`
  max-width: 1200px;
  margin: 24px auto;

  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 16px 0;

    div {
      display: flex;
      flex-direction: row;
      margin-bottom: 8px;

      transition: 0.3s ease;

      img {
        display: flex;

        height: 200px;
        width: 200px;
        border-radius: 50%;
        -webkit-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
      }
      div {
        display: flex;
        flex-direction: column;

        width: 100%;
        margin: 0 16px;
        h2 {
          font-family: Dosis;
          font-style: normal;
          font-weight: 500;
          font-size: 44px;
          line-height: 40px;

          color: ${secondaryColor};

          margin-bottom: 18px;
        }
        p {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          line-height: 20px;

          color: #000000;
        }
      }
    }
    a {
      width: 159px;
      height: 47px;
      margin-bottom: 8px;
      margin-left: auto;
      background: ${tertiaryColor};
      border-radius: 8px;

      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 23px;

      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: space-around;
      transition: 0.3s;

      color: #e5e5e5;
      svg {
        font-size: 32px;
        color: #e5e5e5;
        transition: 0.3s;
        transform: translateX(-8px);
      }

      &:hover {
        background: ${shade(0.1, tertiaryColor)};
        svg {
          transform: translateX(0px);
        }
      }
    }
    .line {
      border-bottom: 4px solid ${tertiaryColor};
    }
    :hover {
      .line {
        box-shadow: 0px -1px 8px rgba(255, 102, 0, 0.8);
      }
    }
  }
  div:nth-child(even) {
    img {
      order: 1;
    }
  }

  > a {
    width: 173px;
    height: 46px;

    background: ${secondaryColor};
    border-radius: 8px;
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;

    color: #e5e5e5;

    margin: 0 auto;
    svg {
      color: #e5e5e5;
      font-size: 32px;
      margin: 4px;
    }
  }
`;

export const SelectPage = styled.section<ISelectPageProps>`
  margin: 0 auto;
  width: 488px;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;

    li {
      width: 44px;
      background: ${secondaryColor};
      height: 44px;
      border-radius: 8px;
      text-align: center;
      transition: 0.3s ease;

      & + li {
        margin-left: 8px;
      }

      a {
        color: white;
        text-decoration: none;
        font-family: 'Dosis';
        font-size: 32px;
        font-weight: 300;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
      }
      &:hover {
        background: ${tertiaryColor};
      }

      ${(pros) => css`
        &:nth-child(${pros.currentPage === 1
              ? pros.currentPage
              : pros.currentPage + 1}) {
          background: ${tertiaryColor};
          width: 52px;
          height: 52px;
        }
      `}
    }
  }
`;
