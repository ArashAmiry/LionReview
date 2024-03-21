import { useEffect, useState } from 'react';
import './stylesheets/TemplateCard.css'
import { Button } from "react-bootstrap";
import { Template, presetTemplates } from './Template';
import TemplatePopupField from './TemplatePopupField';
import { ITemplate } from '../interfaces/ITemplate';

interface CardProps {
  template: ITemplate;
}

const TemplateCard: React.FC<CardProps> = ({template}) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handlePreviewEditClick = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore default scrolling behavior when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopupOpen]);

  return (
    <div 
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className='title'>{template.name}</h2>
      {!isHovered && (<h3 className='card-info'>{template.info}</h3>)}
      {isHovered && (
        <div className="buttons" onClick={handlePreviewEditClick}>
            <Button type="button" className="btn btn-primary">Preview and Edit</Button>
        </div>
      )}
      {isPopupOpen && (
        <div className='popup-container'>
          <TemplatePopupField template={template} onClose={() => setIsPopupOpen(false)} />
        </div>
      )}

      
    </div>
  );
};

/*
export const presetTemplateCardList: JSX.Element[] = [
  <TemplateCard key={1} template={presetTemplates.securityTemplate}></TemplateCard>,
  <TemplateCard key={2} template={presetTemplates.codeStructureTemplate}></TemplateCard>,
  <TemplateCard key={3} template={presetTemplates.performanceTemplate}></TemplateCard>,
  <TemplateCard key={4} template={presetTemplates.performanceTemplate}></TemplateCard>,
  <TemplateCard key={5} template={presetTemplates.performanceTemplate}></TemplateCard>,
  // Add more TemplateCard objects as needed
];
*/

export default TemplateCard;