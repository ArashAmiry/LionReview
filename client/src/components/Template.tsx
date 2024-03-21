import React, { useEffect, useState } from 'react';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "./stylesheets/PresetQuestions.css";
import Form from "react-bootstrap/esm/Form";
import ListGroup from "react-bootstrap/esm/ListGroup";
import TemplateCard from './TemplateCard';


export class Template {
  key: string;
  name: string;
  info: string;
  checkboxQuestions: {
    questionType: string;
    question: string;
  }[]

  textfieldQuestions: {
    questionType: string;
    question: string;
  }[]

  constructor(key: string, name: string, info: string, checkboxQuestions:{questionType: string, question: string}[], textfieldQuestions: {questionType: string, question: string}[]) {
    this.key = key;
    this.name = name;
    this.info = info;
    this.checkboxQuestions = checkboxQuestions;
    this.textfieldQuestions = textfieldQuestions;
  }
}

export interface TemplateData {
  [key: string]: Template;
}

export const presetTemplates: TemplateData = {
  securityTemplateKey: {
    key: 'securityTemplateKey',
    name: 'Security Template',
    info: 'Short information about the template. This template is about security.',
    checkboxQuestions: [{questionType:'checkbox', question:'Checkbox Question 1'}, {questionType:'checkbox', question:'Checkbox Question 2'}],
    textfieldQuestions: [{questionType:'textfield', question:'Textfield Question 1'}, {questionType:'textfield', question:'Textfield Question 2'}],
  },
  codeStructureTemplate: {
    key: 'key2',
    name: 'Code Structure',
    info: 'Short information about the template',
    checkboxQuestions: [{questionType:'checkbox', question:'Checkbox Question 1'}, {questionType:'checkbox', question:'Checkbox Question 2'}],
    textfieldQuestions: [{questionType:'textfield', question:'Textfield Question 1'}, {questionType:'textfield', question:'Textfield Question 2'}],
  },
  performanceTemplate: {
    key: 'key3',
    name: 'Performance Template',
    info: 'Short information about the template',
    checkboxQuestions: [{questionType:'checkbox', question:'Checkbox Question 1'}, {questionType:'checkbox', question:'Checkbox Question 2'}],
    textfieldQuestions: [{questionType:'textfield', question:'Textfield Question 1'}, {questionType:'textfield', question:'Textfield Question 2'}],
  },
};


export default Template;

/*
interface Template {
  key: string;
  name: string;
  info: string;
  checkboxQuestions: string[];
  textfieldQuestions: string[];
}

export interface TemplateData {
  [key: string]: Template;
}

export class TemplateManager {
  private templates: TemplateData;

  constructor(templates: TemplateData = {}) {
    this.templates = templates;
  }

  // Add or update a template
  public updateTemplate(key: string, template: Template): void {
    this.templates[key] = template;
  }

  // Get a template by key
  public getTemplate(key: string): Template {
    return this.templates[key];
  }

  // Get all templates
  public getAllTemplates(): TemplateData {
    return this.templates;
  }

  // Delete a template by key
  public deleteTemplate(key: string): void {
    delete this.templates[key];
  }
}

// Example usage:

export const presetTemplates: TemplateData = {
  securityTemplateKey: {
    key: 'securityTemplateKey',
    name: 'Security Template',
    info: 'Short information about the template. This template is about security.',
    checkboxQuestions: ['Checkbox Question 1', 'Checkbox Question 2'],
    textfieldQuestions: ['Textfield Question 1', 'Textfield Question 2'],
  },
  codeStructureTemplate: {
    key: 'key2',
    name: 'Code Structure',
    info: 'Short information about the template',
    checkboxQuestions: ['Checkbox Question 1', 'Checkbox Question 2'],
    textfieldQuestions: ['Textfield Question 1', 'Textfield Question 2'],
  },
  performanceTemplate: {
    key: 'key3',
    name: 'Performance Template',
    info: 'Short information about the template',
    checkboxQuestions: ['Checkbox Question 1', 'Checkbox Question 2'],
    textfieldQuestions: ['Textfield Question 1', 'Textfield Question 2'],
  },
};

const templateManager = new TemplateManager(presetTemplates);


/*
// Accessing templates
const allTemplates = templateManager.getAllTemplates();
console.log(allTemplates);

// Accessing a specific template
const securityTemplate = templateManager.getTemplate('securityTemplate');
console.log(securityTemplate);

// Deleting a template
templateManager.deleteTemplate('codeStructureTemplate');
console.log(templateManager.getAllTemplates());
*/

/*export const updateTemplate = (
  templateData: TemplateData,
  templateKey: string,
  updatedName: string,
  updatedInfo: string,
  updatedCheckboxQuestions: string[],
  updatedTextfieldQuestions: string[]
): void => {
  // Check if the template key exists in the template data
  if (templateKey in templateData) {
    // Update the template with the new values
    templateData[templateKey] = {
      name: updatedName,
      info: updatedInfo,
      checkboxQuestions: updatedCheckboxQuestions,
      textfieldQuestions: updatedTextfieldQuestions,
    };
  } else {
    console.error(`Template with key '${templateKey}' does not exist.`);
  }
};
*/



