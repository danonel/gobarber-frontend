import React from 'react';

import { useTransition } from 'react-spring';
import Toast from './toast';

import { Container } from './style';
import { ToastMessage } from '../../hooks/Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: '0' },
      enter: { right: '0%', opacity: '1' },
      leave: { right: '-120%', opacity: '0' },
      config: { mass: 1, tension: 150, friction: 17 },
    },
  );

  return (
    <Container>
      {messagesWithTransition.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
