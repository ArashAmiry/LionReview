import React, { useState, useEffect } from 'react';
import TemplateCard from '../components/TemplateCard';
import './stylesheets/TemplatePage.css'
import axios from "axios";
import { ITemplate } from "../interfaces/ITemplate"
import { Col, Row } from 'react-bootstrap';
import NewTemplatePopup from '../components/NewTemplatePopup';
import SaveTemplate from '../components/SaveTemplate';

const TemplatePage: React.FC = () => {

  const [newTemplatePopup, setnewTemplatePopup] = useState(false);

  const handleNewTemplateButton = () => {
    if (newTemplatePopup){
      setnewTemplatePopup(false);
      fetchSavedTemplates();
    }
    else{
      setnewTemplatePopup(true);
    }
  }

  useEffect(() => {
    if (newTemplatePopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore default scrolling behavior when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [newTemplatePopup]);

  const [savedTemplates, setSavedTemplates] = useState<ITemplate[]>([]);


  useEffect(() => {
    fetchSavedTemplates();
  }, []);
  

  const fetchSavedTemplates = async () => {
    const response = await axios.get<ITemplate[]>(`http://localhost:8080/template/getSavedTemplate`) //ändra /templates/...
      .then(function (response) {
        setSavedTemplates(response.data); //ändra (setTemplates, rad 60)
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log("error: " + error);
      });
  };

  const deleteTemplate = async (templateId: string) => {
    const response = await axios.delete<Boolean>(`http://localhost:8080/template/deleteTemplate/${templateId}`) //ändra /templates/...
        .then(function (response) {
        //setSavedTemplates(response.data);
        //handleDelete()
        //onClose()
        console.log(response);
        fetchSavedTemplates();
        })

        .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {

            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log("error: " + error);
        });
};


  return (
    <body className= 'templatebody'>
    <div className='templateContainer'>
      <div className="saved_templates_container">
      <h1 className='saved-teamplates'>Saved Templates</h1>
      <button type="button" className="btn btn-light" onClick={handleNewTemplateButton}>Create New Template</button>
      <div className='d-flex align-center justify-content-center'>
        {savedTemplates.length > 0 ? (
        <Row className="mx-0 templates-row">
          {savedTemplates.map((template) => (
            <Col key={template._id} xl={3} className='d-flex align-center justify-content-center mt-4 px-4'>
              <TemplateCard templateId={template._id} template={template} deleteTemplate={(id: string) => deleteTemplate(id)}/>
            </Col>
          ))}
        </Row>
      ) : (
        <p className='defaultMessage'>No templates have been saved. You can save templates when you create reviews and then access them from here or when creating a review.</p>
      )}
      </div>
      
      </div>
      {newTemplatePopup && (
        <div className='popup-container'>
          <NewTemplatePopup onClose={handleNewTemplateButton} /> 
        </div>
      )}
    </div>
    </body>
  );
};


export default TemplatePage;

/* <SaveTemplate onClose={handleNewTemplateButton} questions={SaveTemplates[1].questions}></SaveTemplate> */
/* <NewTemplatePopup onClose={handleNewTemplateButton} /> */