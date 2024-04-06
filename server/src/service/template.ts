import { templateModel } from "../db/template";
import { ITemplate } from "../model/ITemplate";

export class TemplateService {
    

    async createPresetTemplate(template: Omit<ITemplate, 'category'>, category: string) {
        try {
            await templateModel.create({
                _id: template._id,
                category: "preset", // Set the category to "presetTemplates"
                name: template.name,
                info: template.info,
                questions: template.questions
            });
        } catch (error) {
            console.error('An error occurred while creating the preset template:', error);
            // Handle the error appropriately
            throw error;
        }
    }

    async createSavedTemplate(template: Omit<ITemplate, 'category'>, category: string) {
        try {
            await templateModel.create({
                _id: template._id,
                category: "saved", // Set the category to "presetTemplates"
                name: template.name,
                info: template.info,
                questions: template.questions
            });
        } catch (error) {
            console.error('An error occurred while creating the preset template:', error);
            // Handle the error appropriately
            throw error;
        }
    }


    async getTemplates(category: string) {
        try {
            const templates = await templateModel.find({ category: category }).exec();
            return templates;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

    async getTemplate(TemplateId: string): Promise<ITemplate | undefined> {
        try {
            const template = await templateModel.findOne({ _id: TemplateId }).exec();
            if (template !== null) { // since findById returns null if no document is found
                return template.toObject();
            }
        } catch (error) {
            console.error('An error occurred while fetching the review:', error);
            // Handle the error appropriately
        }

        throw new Error("No review was found with id: " + TemplateId);
    }


    async updateTemplate(TemplateId: string, updatedTemplate: Partial<ITemplate>) {
        try {
            const result = await templateModel.findOneAndUpdate({_id: TemplateId}, {updatedTemplate}, { new: true });
            if (result) {
                return result.toObject();
            } else {
                throw new Error("No template was found with id: " + TemplateId);
            }
        } catch (error) {
            console.error('An error occurred while updating the template:', error);
            // Handle the error appropriately
            throw error;
        }
    }

    async deleteTemplate(templateId: string) {
        try {
            const result = await templateModel.findByIdAndDelete(templateId);
            if (result) {
                return result;
            } else {
                throw new Error("No template was found with id: " + templateId);
            }
        } catch (error) {
            console.error('An error occurred while deleting the template:', error);
            // Handle the error appropriately
            throw error;
        }
    }

    
}

