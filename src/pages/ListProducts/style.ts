import styled from 'styled-components';

import { transparentize } from 'polished';
import {
  secondaryBackground,
  primaryColor,
  secondaryColor,
  tertiaryColor,
} from '../../styles/paletsColorers';

interface FilterPros {
  name: string;
}

export const Main = styled.main`
  background: #fff;
  padding: 12px;
  border-radius: 0 0 24px 24px;
  margin-bottom: 100px;
`;

export const SectionFilters = styled.section<FilterPros>`
  max-width: 1200px;
  margin: 40px auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .areaExpensive {
    width: 250px;
  }
  .typeWorks {
    width: 550px;
  }
  .order {
    width: 150px;
  }
`;

export const Projects = styled.div`
  margin-top: 80px;
  max-width: 1200px;
  margin: 24px auto;

  a {
    margin-top: 16px;
    background: ${secondaryBackground};

    border-radius: 8px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: unset;
    transition: all 0.2s;

    &:hover {
      background: ${transparentize(0.00001, secondaryBackground)};

      -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.75);

      transform: translateX(8px);
    }

    img {
      min-width: 80px;
      min-height: 80px;
      max-width: 80px;
      max-height: 80px;
      border-radius: 50%;
      display: flex;
      flex-shrink: 1;
      margin-right: 8px;
      margin-top: 16px;
    }

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      strong {
        display: flex;
        justify-content: space-between;

        margin: 12px;
        width: 100%;

        font-size: 20px;
        line-height: 30px;
        color: ${primaryColor};

        span {
          margin-left: 16px;

          color: ${tertiaryColor};
          font-weight: 200;
          font-family: 'Dosis';
        }
      }

      > div {
        display: flex;
        color: #a8a8b3;

        > div {
          display: flex;
          flex-direction: column;

          max-width: 330px;
          margin-right: 4px;

          > span {
            & + span {
              margin-top: 16px;
            }

            font-size: 16px;

            svg {
              margin-right: 4px;
              color: ${tertiaryColor};
            }
          }
        }

        p {
          margin-right: 16px;
          width: 100%;
          flex: 1;

          font-size: 18px;
        }

        svg {
          margin: auto;
        }
      }
    }
  }
`;

export const CardWarning = styled.div`
  max-width: 1200px;

  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
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
