import React from 'react';

import { Container } from './styles';

interface ITooltipProps {
  title: string;
  subTitle?: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({
  title,
  className = '',
  children,
  subTitle,
}) => {
  return (
    <Container className={className}>
      {children}
      <span className="tooltip">
        <strong>{subTitle}</strong>
        {title}
      </span>
    </Container>
  );
};

export default Tooltip;
