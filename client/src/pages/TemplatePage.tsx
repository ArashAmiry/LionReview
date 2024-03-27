import React, { useState, useEffect } from 'react';
import TemplateCard from '../components/TemplateCard';
import './stylesheets/TemplatePage.css'
import axios from "axios";
import { ITemplate } from "../interfaces/ITemplate"
import { Col, Row } from 'react-bootstrap';

const TemplatePage: React.FC = () => {


  const [savedTemplates, setSavedTemplates] = useState<ITemplate[]>([]);
  const [presetTemplates, setPresetTemplates] = useState<ITemplate[]>([]);

  useEffect(() => {
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

    fetchSavedTemplates();
  }, []);

  useEffect(() => {
    const fetchPresetTemplates = async () => {
      const response = await axios.get<ITemplate[]>(`http://localhost:8080/template/getPresetTemplate`) //ändra /templates/...
        .then(function (response) {
          setPresetTemplates(response.data); //ändra (setTemplates, rad 60)
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

    fetchPresetTemplates();
  }, []);


  return (
    <div className='templateContainer'>
      <div className="saved_templates_container">
      <h1>Saved Templates</h1>
      {savedTemplates.length > 0 ? (
        <Row>
          {savedTemplates.map((template) => (
            <Col key={template._id} xl={3} className='mt-4 px-4'>
              <TemplateCard templateId={template._id} template={template}/>
            </Col>
          ))}
        </Row>
      ) : (
        <p className='defaultMessage'>No templates have been saved. You can save templates when you create reviews and then access them from here or when creating a review.</p>
      )}
      </div>
      
      <div className="preset_templates_container">
        <h1>Preset Templates</h1>
        <Row>
          {presetTemplates.map((template) => (
            <Col key={template._id} xl={3} className='mt-4 px-4'>
              console.log(template._id)
              <TemplateCard templateId={template._id} template={template}/>
            </Col>
          ))}
        </Row>
      </div>
      
    </div>
  );
};


export default TemplatePage;