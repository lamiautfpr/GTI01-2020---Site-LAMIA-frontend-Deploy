import styled, { css } from 'styled-components';

import { transparentize, shade } from 'polished';
import {
  secondaryBackground,
  primaryColor,
  secondaryColor,
  featuredColor,
  titleColor,
  tertiaryColor,
} from '../../styles/paletsColorers';
import Tooltip from '../../components/Tooltip';

interface WarningPros {
  textColor?: string;
}

interface ParticipantProps {
  responsibility?:
    | 'Coordenador'
    | 'Colaborador'
    | 'Orientador'
    | 'Membro/Líder'
    | 'Membro';
}

export const Main = styled.main`
  background: #fff;
  padding: 12px 72px;
  border-radius: 0 0 24px 24px;
  margin-bottom: 100px;

  > div {
    max-width: 1200px;
    margin: 0 auto;
    min-height: 250px;
  }

  /* border: 1px solid red; */
`;

export const Content = styled.section`
  /* border: 1px solid red; */

  display: flex;
`;

export const HeadTitle = styled.div`
  max-width: 924px;
  height: auto;
  margin: 0 24px 4px;
  /* margin-top: 32px; */
  margin-left: 0px;

  display:flex;
  flex-direction: column;

  .info{
    /* border: 1px solid red; */

    height: 100px;
    width: calc(100% - 110px);
    border-radius: 16px;

    margin-top: 64px;
    margin-left: 140px;
    padding:16px;
    padding-left: 84px;


    background: ${featuredColor};

    h1{
      /* transform: translateX(4px); */
      color: #f0f0f0;
      font-size: x-large;
    }

     -webkit-box-shadow: 10px 10px 64px -16px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 64px -16px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 64px -16px rgba(0, 0, 0, 0.75);
  }

  .imgBorde {

    /* background: white; */
    /* border: 4px solid ${featuredColor}; */
    border: 4px solid ${featuredColor};
    margin-top: -150px;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    /* transform: rotate(45deg); */
    /* padding: 6px; */
    transition: 0.2s all;

    &:hover {

      transform: translateX(24px);

    }

    div {
      /* border: 1px solid red; */
      border-radius: 50%;
      padding: 8px;
      height: 100%;



      -webkit-box-shadow: inset 0px 0px 71px -23px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: inset 0px 0px 71px -23px rgba(0, 0, 0, 0.2);
      box-shadow: inset 0px 0px 71px -23px rgba(0, 0, 0, 0.2);
    }

    img {
      /* transform: rotate(-45deg); */
      height: 176px;
      width: 176px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

export const SectionText = styled.section`
  /* border: 1px solid purple; */

  display: flex;
  flex-direction: column;

  max-width: 960px;
  width: 100%;
  padding: 12px;
  .column {
    flex-direction: column;
    position: relative;
  }

  .text {
    p {
      font-size: 20px;
    }

    a {
      color: ${tertiaryColor};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const SectionColumn = styled.section`
  display: flex;
  flex-direction: column;

  margin-top: -172px;
`;

export const HeaderSection = styled.header`
    display:flex;
    flex-direction: column;

    margin: 24px 0 16px 16px;
    /* border-bottom: 1px solid ${titleColor}; */

    font-size: 32px;
    color: ${titleColor};

    &::after{
      content: "";
      width: 224px;
      height: 2px;
      background-image: -webkit-linear-gradient(180deg, ${primaryColor} 15%, ${secondaryColor} 85%);

      position: relative;
    }

`;

export const Aside = styled.aside`
  background: ${featuredColor};

  max-width: 220px;
  width: 100%;
  /* max-height: 400px; */

  padding: 8px;
  margin: 16px;

  -webkit-box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.24);
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.24);

  h1 {
    font-size: 24px;
    color: #f0f0f0;
    margin-bottom: 8px;

  }

  > div {
    margin: 4px;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;

    span {
      display: flex;
      /* flex-direction: row; */
      margin-top: 4px;

      font-size: 16px;
      color: ${transparentize(0.2, '#f0f0f0')};

      svg {
        margin-right: 4px;
        color: ${transparentize(0.2, '#f0f0f0')};
      }
    }
  }

  .BePartner {
    margin: 8px;
    margin-top: 24px;
    border: 2px solid #fff;
    border-radius: 20px;
    font-size: 20px;
    padding: 2px 8px;
    line-height: 30px;
    text-decoration: none;
    text-transform: uppercase;
    font-family: 'Dosis';
    background: #fff;
    font-weight: bold;
    color: ${featuredColor};
    transition: 0.3s;

    &:hover {
      /* border: 0px solid white;

      transform: translateX(2px);

      color: ${transparentize(0, primaryColor)}; */
      background: ${featuredColor};
      color: white;
    }
  }

  border-radius: 16px;

  /* a.box {
    cursor: pointer;
  } */
  font-family: dosis;

  section {
    display: flex;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      flex: 1 0;
      height: 72px;
      width: 96px;

      /* padding: 2px; */
      /* margin: 2px; */
      /* margin-left: 8px; */

      -webkit-border-radius: 16px;
      -moz-border-radius: 16px;
      border-radius: 16px;

      background: ${shade(0.01, secondaryBackground)};

      /* font-weight: bold; */
      font-size: 64px;
      text-decoration: none;

      svg {
        margin: 0;
        padding: 0;
        margin-top: 4px;
        color: ${titleColor};

        /* size: 64px; */
      }

      p {
        margin-right: 16px;
        font-size: 16px;
        /* font-family: dosis; */
        color: ${titleColor};
        /* text-align: center; */
      }
    }
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

export const CardWarning = styled.div<WarningPros>`
  max-width: 1200px;

  margin: 24px 0;

  display: flex;
  align-items: center;
  justify-content: space-around;

  h2 {
    display: flex;
    /* flex-direction: column; */

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
`;

export const Participant = styled(Tooltip)<ParticipantProps>`
  width: fit-content;
  margin: 8px;

  a {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid white;
      object-fit: contain;
      background-color: #fff;

      margin: 2px;
      transition: 0.4s;
    }
  }

  .tooltip {
    max-width: 300px;
  }

  ${({ responsibility }) =>
    responsibility === 'Coordenador' &&
    css`
      a {
        img {
          border-color: ${tertiaryColor};
        }
      }
      .tooltip {
        background: ${tertiaryColor};
        color: white;

        &::before {
          border-color: ${tertiaryColor} transparent;
        }
      }
    `}

  ${({ responsibility }) =>
    responsibility === 'Membro/Líder' &&
    css`
      a {
        img {
          border-color: ${secondaryColor};
        }
      }
      .tooltip {
        background: ${secondaryColor};
        color: white;

        &::before {
          border-color: ${secondaryColor} transparent;
        }
      }
    `}

    ${({ responsibility }) =>
      responsibility === 'Membro' &&
      css`
        .tooltip {
          background: ${secondaryBackground};
          color: #000;

          &::before {
            border-color: ${secondaryBackground} transparent;
          }
        }
      `}
`;
