import styled from 'styled-components';

import { secondaryBackground } from '../../styles/paletsColorers';

export const Nav = styled.nav`
  background-color: #fff;
  padding: 12px;
  margin-top: 16px;
  border-radius: 24px 24px 0 0;

  -webkit-box-shadow: 0px 10px 14px -15px rgba(138, 138, 138, 1);
  -moz-box-shadow: 0px 10px 14px -15px rgba(138, 138, 138, 1);
  box-shadow: 0px 10px 14px -15px rgba(138, 138, 138, 1);

  /* Deixa nav fixa no top durante o scroll */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10; /* Para deixar nav por cima de tudo */

  &:after {
    content: '';
    border-radius: 0;
  }

  font-size: 18px;

  ul {
    max-width: 1200px;
    margin: 0 auto;

    list-style: none;

    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      padding: 12px;
      border-radius: 8px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.95);

        ul {
          display: block;
        }
      }

      a {
        color: #636363;
        text-decoration: none;
      }

      .DropDraw {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        background: ${secondaryBackground};
        border-radius: 8px;
        box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.065), inset 0 -1px 0 0 #fff,
          inset 0 0 0 1px rgba(229, 229, 229, 0.5);
        padding: 8px;
        width: 200px;
        margin-top: 12px;
        display: none;
        position: absolute;
        z-index: 1;

        &:before {
          -moz-transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
          background: ${secondaryBackground};
          border: solid 1px rgba(229, 229, 229, 0.5);
          border-bottom: 0;
          border-right: 0;
          box-shadow: -0.25em -0.125em 0.125em 0 rgba(0, 0, 0, 0.015);
          content: '';
          display: block;
          height: 8px;
          position: absolute;
          left: 16px;
          top: -5px;
          width: 8px;
          z-index: 0;
        }
      }

      .lastDropDraw {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        background: ${secondaryBackground};
        border-radius: 8px;
        box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.065), inset 0 -1px 0 0 #fff,
          inset 0 0 0 1px rgba(229, 229, 229, 0.5);
        padding: 8px;
        width: 200px;
        margin-top: 12px;
        display: none;
        position: absolute;
        z-index: 1;

        right: 1em;

        &:before {
          -moz-transform: rotate(45deg);
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
          background: ${secondaryBackground};
          border: solid 1px rgba(229, 229, 229, 0.5);
          border-bottom: 0;
          border-right: 0;
          box-shadow: -0.25em -0.125em 0.125em 0 rgba(0, 0, 0, 0.015);
          content: '';
          display: block;
          height: 8px;
          position: absolute;
          right: 35%;
          top: -5px;
          width: 8px;
          z-index: 0;
        }
      }
    }
  }
`;
