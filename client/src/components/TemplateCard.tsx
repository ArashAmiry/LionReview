import { useEffect, useState } from 'react';
import './stylesheets/TemplateCard.css'
import { Button } from "react-bootstrap";
import TemplatePopupField from './TemplatePopupField';
import { ITemplate } from '../interfaces/ITemplate';

interface CardProps {
  templateId: string
  template: ITemplate;
  deleteTemplate: (id: string) => void
  //handleDelete: () => void;
}

const TemplateCard: React.FC<CardProps> = ({templateId, template, deleteTemplate}) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handlePreviewEditClick = () => {
    setIsPopupOpen(true);
    setIsHovered(false);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      setIsHovered(false);
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
        <div className="button">
        <Button type="button" className="btn btn-primary" onClick={handlePreviewEditClick}>Preview and Edit</Button>
      </div>
      )}
      {isPopupOpen && (
        <div className='popup-container'>
          <TemplatePopupField templateId={templateId} template={template} onClose={() => setIsPopupOpen(false)}  deleteTemplate={(id: string) => deleteTemplate(id)}/>
        </div>
      )}

      
    </div>
  );
};


export default TemplateCard;