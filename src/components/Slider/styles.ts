import { transparentize } from 'polished';
import styled from 'styled-components';
import { tertiaryColor } from '../../styles/paletsColorers';

export const Container = styled.div`
  .awssld__wrapper {
    .awssld__container {
      height: 176px;
      padding-bottom: 0;

      .awssld__box {
        .awssld__content {
          display: flex;
          justify-content: center;
          align-items: center;

          /* background: ${transparentize(0.75, 'white')};*/
          background: transparent;
          height: 100%;

          .slider-item {
            display: flex;
            flex-direction: column;
            max-width: 300px;
            margin: 0 auto;

            img {
              max-width: 300px;
              max-height: 160px;
            }

            h2 {
              color: #fff;
              font-family: 'Source Sans Pro', sans-serif;
              text-align: center;
            }
          }
        }
      }
    }

    .awssld__controls__arrow-left:before,
    .awssld__controls__arrow-left:after,
    .awssld__controls__arrow-right:before,
    .awssld__controls__arrow-right:after {
      background-color: ${tertiaryColor};
    }
  }

  .awssld__bullets {
    .awssld__bullets--active {
      background: ${tertiaryColor};
    }
  }
`;
