import { shade, transparentize } from 'polished';
import styled from 'styled-components';
import { device } from '../../styles/device';
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

  @media ${device.mobileL} {
    font-size: 20px;
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
    flex-direction: column;

    justify-content: space-between;
    padding: 0 32px;
    margin-bottom: 16px;
    margin-top: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      header {
        margin-bottom: 8px;

        font-size: 24px;
        color: ${titleColor};
      }
    }

    @media ${device.mobileL} {
      padding: 0 8px;
    }
  }
`;

export const SubTitle = styled.h3`
  color: ${featuredColor};
  font-size: 24px;
  margin-bottom: 8px;
`;

export const ScheduleTable = styled.div`
  margin: 8px 0;
  padding: 8px 0;
  width: 100%;
  display: flex;
  flex-direction: column;

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

export const ShelfGallery = styled.div`
  max-width: 1200px;
  margin: 12px auto;

  .react-photo-gallery--gallery {
    > div {
      justify-content: center;
    }
  }

  img {
    max-width: 350px;
    width: 100%;
    height: auto;

    border-radius: 8px;
    transition: 0.3s;

    -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);

    &:hover {
      transform: scale(1.05);
    }
  }
`;
