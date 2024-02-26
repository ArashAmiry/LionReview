import React, { ReactNode } from 'react';

interface BlueBackgroundProps {
  children: ReactNode;
}

const BlueBackground: React.FC<BlueBackgroundProps> = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#243945', height: '100vh' }}>
      {children}
    </div>
  );
};

export default BlueBackground;