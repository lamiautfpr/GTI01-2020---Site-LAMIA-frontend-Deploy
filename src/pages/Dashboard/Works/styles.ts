import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { device } from '../../../styles/device';
import {
  primaryColor,
  secondaryBackground,
  secondaryColor,
  tertiaryColor,
  titleColor,
} from '../../../styles/paletsColorers';

interface ISelectPageProps {
  currentPage: number;
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

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > aside {
      display: flex;
      flex-direction: column;

      > section {
        display: flex;
        flex-direction: row;
        text-align: center;
        justify-content: center;
        align-items: center;
        background: ${secondaryBackground};
        border-radius: 8px;
        padding: 4px;

        & + section {
          border-top: 4px solid #fff;
        }

        > div {
          width: 160px;

          & + div {
            border-left: 4px solid #fff;
          }

          font-size: 16px;
          color: ${primaryColor};
        }
      }
    }

    margin-bottom: 16px;
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

  > a {
    & + a {
      margin-top: 16px;
    }

    background-color: ${secondaryBackground};

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

export const SelectPage = styled.section<ISelectPageProps>`
  margin: 0 auto;
  margin-top: 16px;
  width: 100%;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;

    li {
      width: 44px;
      background: ${tertiaryColor};
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
        -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);

        transform: translateY(-2px);
      }

      ${(pros) => css`
        &:nth-child(${pros.currentPage === 1
              ? pros.currentPage
              : pros.currentPage + 1}) {
          background: ${primaryColor};
        }
      `}
    }
  }
`;
