import React, { ReactNode } from 'react';

interface ButtonBoxProps {
  children: ReactNode;
}

function ButtonBox({ children }: ButtonBoxProps) {
  return (
    <div className="buttonBoxContainer">
      <div className="buttonBox">{children}</div>
    </div>
  );
}

export default ButtonBox;