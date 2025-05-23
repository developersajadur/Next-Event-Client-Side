import React, { ReactNode } from 'react';

const NextButton = ({ name, onClick, disabled }: { name: ReactNode, onClick?: () => void, disabled?: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={`nextButton ${disabled ? 'opacity-50 cursor-not-allowed' : ''} box-border`}
      disabled={disabled}
      type='submit'
    >
      <span>{name}</span>
    </button>
  );
};

export default NextButton;