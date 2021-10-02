import styled, { css } from 'styled-components';
import { shade, transparentize } from 'polished';
import {
  secondaryBackground,
  tertiaryColor,
  secondaryColor,
} from '../../styles/paletsColorers';
import { device } from '../../styles/device';

interface IPropsItemMenu {
  active?: boolean;
}

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
  z-index: 11; /* Para deixar nav por cima de tudo */

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

    @media ${device.tablet} {
      display: none;
    }
  }
  /* *** BUGER MENU *** */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    right: 36px;
    top: 24px;
    display: none;

    @media ${device.tablet} {
      display: block;
    }
  }
  .bm-burger-bars {
    border-radius: 4px;
    background: ${tertiaryColor};
    transition: all 0.2s ease-out;
  }
  .bm-burger-bars-hover {
    background: ${shade(0.1, tertiaryColor)};
  }
  .bm-cross-button {
    height: 32px;
    width: 32px;
  }
  .bm-cross {
    font-size: 24px;
    background: ${tertiaryColor};
    width: 4px;
    height: 16px;
  }
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
    top: 0px;
  }
  .bm-menu {
    background: #fff;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
    right: 10px;
  }
  .bm-morph-shape {
    fill: #373a47;
  }

  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;

    li + li {
      margin-top: 12px;
    }
  }
  .bm-item {
    display: inline-block;
  }
`;

export const styleBugerMenu = {
  bmOverlay: {
    position: 'fixed',
    top: '24px',
    background: transparentize(0.25, secondaryColor),
  },
};

export const NavItem = styled.li<IPropsItemMenu>`
  padding: 12px;
  border-radius: 8px;

  transition: 0.3s all;

  a {
    color: #636363;
    text-decoration: none;
  }

  &:hover {
    background-color: ${tertiaryColor};
    color: #fff;

    > a {
      color: #fff;
    }

    ul {
      display: block;
    }
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

  ${(props) =>
    props.active &&
    css`
      background-color: ${tertiaryColor};
      > a {
        color: #fff;
      }
    `}
`;

export const BugerMenu = styled.nav``;
