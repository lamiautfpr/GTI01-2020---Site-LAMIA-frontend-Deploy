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

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 16px;
    margin-top: 16px;

    div {
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

    img {
      flex-shrink: 0;

      height: 200px;
      width: 200px;
      border-radius: 50%;
      -webkit-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
      object-fit: none;
    }
  }
`;

export const SectionNews = styled.section`
  max-width: 1200px;
  margin: 24px auto;

  display: flex;
  flex-direction: column;

  .slider-news {
    .awssld__container {
      height: 350px;

      .slider-news-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        max-width: 75%;

        > div {
          display: flex;
          flex-direction: row;
          align-items: center;

          img {
            height: 200px;
            width: 200px;
            margin-right: 8px;
            border-radius: 50%;
            -webkit-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
          }

          h2 {
            font-family: 'Dosis';
            font-style: normal;
            font-weight: 500;
            font-size: 28px;
            line-height: 38px;

            color: ${primaryColor};

            margin-bottom: 18px;
          }

          p {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 20px;

            color: #000000;
          }
        }

        a {
          width: 159px;
          height: 47px;
          margin-top: 16px;
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
      }
    }

    .awssld__bullets {
      bottom: 16px;
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

    transition: 0.3s;

    text-decoration: none;

    color: #e5e5e5;

    margin: 0 auto;
    svg {
      color: #e5e5e5;
      font-size: 32px;
      margin-left: 4px;
      transition: 0.3s;
    }

    &:hover {
      background: ${shade(0.1, secondaryColor)};
      svg {
        transform: translateY(4px);
      }
    }
  }
`;

export const SectionColumn = styled.section`
  max-width: 1200px;
  margin: 24px auto;
  display: flex;
  flex-direction: column;

  > div {
    margin-top: 32px;
  }

  a {
    &:hover {
      img {
        -webkit-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.1);
      }

      h2 {
        text-decoration: underline;
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a,
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 378px;
      margin-left: 0;
      text-decoration: none;
      color: #000;

      & + a,
      & + div {
        margin-left: 24px;
      }

      img {
        flex-shrink: 0;

        height: 200px;
        width: 200px;
        border-radius: 50%;
        -webkit-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 48px -24px rgba(0, 0, 0, 0.75);

        margin-bottom: 16px;
        object-fit: cover;
        transition: 0.3s ease-out;
      }

      .area-expertise {
        object-fit: contain;
      }

      h2 {
        margin-bottom: 4px;
        transition: 0.3s ease-out;
      }
    }
  }
`;

export const SectionVip = styled.section`
  max-width: 1200px;
  height: 376px;
  margin: 24px auto;
  background: ${featuredColor};
  padding: 24px;
  border-radius: 16px;
  -webkit-box-shadow: 10px 10px 64px -16px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 64px -16px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 64px -16px rgba(0, 0, 0, 0.75);

  display: flex;
  flex-direction: column;

  & > header {
    margin: 4px 0 32px 0;

    display: flex;
    flex-wrap: wrap-reverse;

    font-size: 32px;
    color: ${secondaryBackground};

    a {
      margin-left: 64px;

      border: 2px solid white;
      padding: 12px;
      border-radius: 32px;

      background: none;

      text-transform: uppercase;
      font-weight: bold;
      font-size: 20px;
      color: white;
      text-decoration: none;

      cursor: pointer;

      transition: 0.3s;

      &:hover {
        background: white;

        border: 2px solid white;

        transform: translateX(2px);

        color: ${transparentize(0, featuredColor)};
      }
    }

    &::after {
      content: '';

      width: 224px;
      height: 2px;
      background-image: -webkit-linear-gradient(
        180deg,
        #fff 15%,
        ${secondaryBackground} 85%
      );

      position: absolute;
    }
  }
`;

export const SectionCards = styled.section`
  max-width: 1200px;
  min-height: 350px;
  margin: 24px auto;

  display: flex;
  flex-direction: column;

  > div {
    transition: 0.3s;
    margin: 32px 0px;

    -webkit-box-shadow: 0px 8px 12px 2px rgba(161, 159, 161, 1);
    -moz-box-shadow: 0px 8px 12px 2px rgba(161, 159, 161, 1);
    box-shadow: 0px 8px 12px 2px rgba(161, 159, 161, 1);
  }

  > div:hover {
    background: ${transparentize(0.00001, secondaryBackground)};

    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);

    transform: translateY(8px);
  }

  div {
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      background: ${primaryColor};
      width: 300px;
      height: 250px;

      color: #fff;
      font-family: 'Dosis';

      h3 {
        font-size: 40px;
        margin-bottom: 12px;
      }

      div {
        margin: 0px;
        height: 50px;

        font-size: 56px;

        display: flex;
        flex-direction: row;

        svg {
          margin-right: 8px;
        }

        span {
          font-weight: 200;
        }
      }
    }
  }
`;

export const CardWarning = styled.div<WarningPros>`
  max-width: 1200px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  h2 {
    display: flex;

    font-size: 40px;
    font-family: 'Dosis';
    color: ${secondaryColor};

    ${(props) =>
      props.textColor &&
      css`
        color: ${props.textColor};
      `}
  }

  img {
    border-radius: 50%;
    width: 200px;
    height: 200px;

    margin-left: 40px;
  }

  a {
    border: 2px solid white;
    padding: 10px 15px;
    border-radius: 48px;

    background: none;

    text-transform: uppercase;
    font-weight: bold;
    font-size: 40px;
    color: white;
    text-decoration: none;

    cursor: pointer;

    transition: 0.3s;

    &:hover {
      background: white;

      border: 2px solid white;

      transform: translateX(2px);

      color: ${transparentize(0, featuredColor)};
    }
  }
`;
