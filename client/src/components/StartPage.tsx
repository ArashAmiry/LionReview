import React from 'react';
import './stylesheets/StartPage.css'

const StaticTextComponent: React.FC = () => {
  const appName = "ReviewTool";

  return (
    <div className='title-container'>
      <p className='app-name'>{appName}</p>
    </div>
  );
};

export default StaticTextComponent;