import React from 'react';

import { Container } from './styles';

interface TooltipInterface {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipInterface> = ({
  title,
  className,
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
