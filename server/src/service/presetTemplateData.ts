import { ITemplate } from '../model/ITemplate'; // Import your ITemplate interface
import { TemplateService } from './template';

const templateService = new TemplateService();

// Define an array of preset templates
const presetTemplates: Omit<ITemplate, 'category'>[] = [
    {
        _id: "presetSecurity",
        name: "Security Template",
        info: "Short information about the template. This template is about security.",
        questions: [
            { questionType: "text", question: "Question 3" },
            { questionType: "text", question: "Question 4" }
        ]
    },
    {
        _id: "presetCodeStructure",
        name: "Code structure",
        info: "Short information about the template. This template is about code structure",
        questions: [
            { questionType: "text", question: "Question 3" },
            { questionType: "text", question: "Question 4" }
        ]
    },

    {
        _id: "presetPerformance",
        name: "Performance structure",
        info: "Short information about the template. This template is about performance",
        questions: [
            { questionType: "text", question: "Question 3" },
            { questionType: "text", question: "Question 4" }
        ]
    },
    {
        _id: "presetPerformance",
        name: "Performance structure",
        info: "Short information about the template. This template is about performance",
        questions: [
            { questionType: "text", question: "Question 3" },
            { questionType: "text", question: "Question 4" }
        ]
    },
    {
        _id: "presetPerformance",
        name: "Performance structure",
        info: "Short information about the template. This template is about performance",
        questions: [
            { questionType: "text", question: "Question 3" },
            { questionType: "text", question: "Question 4" }
        ]
    },
];

// Function to create preset templates
export async function createPresetTemplates() {
    try {
        // Iterate over each preset template and create it
        for (const template of presetTemplates) {
            await templateService.createPresetTemplate(template, "presetTemplates");
        }
        console.log('Preset templates created successfully.');
    } catch (error) {
        console.error('An error occurred while creating preset templates:', error);
        // Handle the error appropriately
    }
}