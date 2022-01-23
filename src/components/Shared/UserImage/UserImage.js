import styled from 'styled-components';
import { SlideLeft } from '../Animation';

export const MessageItem = styled.div`
  background: ${(props) => props.theme.background};
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.offline};
  gap: 0.75rem;
  animation: ${SlideLeft} 1.5s ease-in-out;

  ${({ noBorder }) =>
    noBorder &&
    `
    border-bottom: none;
  `}
`;

export const MessageInfo = styled.div`
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
`;

export const MessageItemName = styled.p`
  font-weight: 800;
  font-size: 0.95rem;
  background: ${(props) => props.theme.background};
  text-align: center;
  cursor: pointer;
  margin: 0;
`;

export const MessageData = styled.p`
  font-weight: 700;
  font-size: 0.9rem;
  background: ${(props) => props.theme.background};
  text-align: center;
  cursor: pointer;
  margin: 0;
  width: max-content;
  color: ${(props) =>
    props.online
      ? `${(props) => props.theme.online}`
      : `${(props) => props.theme.offline}`};
`;

export const MessageItemUser = styled.img`
  width: 3rem;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.online};
`;
