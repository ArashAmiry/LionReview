import React, { ReactNode } from 'react';

interface BlueBackgroundProps {
  children: ReactNode;
}

const BlueBackground: React.FC<BlueBackgroundProps> = ({ children }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ backgroundColor: '#243945', height: '90vh' }}
    >
      {children}
    </div>
  );
};

export default BlueBackground;