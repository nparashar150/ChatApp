import { keyframes } from 'styled-components';

export const SlideRight = keyframes`
  from {
    margin-right: -20%;
    opacity: 0;
  }
  to {
    margin-right: 0%;
    opacity: 1;
  }
`;

export const SlideLeft = keyframes`
  from {
    margin-left: -20%;
    opacity: 0;
  }
  to {
    margin-left: 0%;
    opacity: 1;
  }
`;

export const FadeIn = keyframes`
  from {
    opacity: 0;
    visibility: 0;
  }
  to {
    opacity: 1;
    visibility: 1;
  }
`;