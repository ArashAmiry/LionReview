import React from 'react';
import './stylesheets/StartPage.css'

const StaticTextComponent: React.FC = () => {
  const appName = "LionReview";

  return (
    <body className='body-main'>
    <div className='title-container d-flex flex-column justify-content-center'>
      <p className='app-name'>{appName}</p>
    </div>
    </body>
  );
};

export default StaticTextComponent;