import styled, { css } from 'styled-components';

import { transparentize } from 'polished';
import {
  secondaryBackground,
  titleColor,
  tertiaryColor,
  featuredColor,
} from '../../../styles/paletsColorers';

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

  .warning {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    strong {
      font-weight: bold;
      font-size: 32px;
      font-family: 'Source Sans Pro', sans-serif;
      color: ${featuredColor};
      margin: 8px 0;
    }

    span {
      font-weight: bold;
      font-size: 24px;
      font-family: 'Source Sans Pro', sans-serif;
      color: ${tertiaryColor};
    }
  }
`;
