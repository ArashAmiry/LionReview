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
    <>
    <div 
      className={`template-card bg-body`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePreviewEditClick}
    >
      <h4 className='title'>{template.name}</h4>
      <p className='card-info'>{template.info}</p>      
    </div>
    {isPopupOpen && (
      <div className='popup-container'>
        <TemplatePopupField templateId={templateId} template={template} onClose={() => setIsPopupOpen(false)}  deleteTemplate={(id: string) => deleteTemplate(id)}/>
      </div>
    )}</>
    
  );
};


export default TemplateCard;