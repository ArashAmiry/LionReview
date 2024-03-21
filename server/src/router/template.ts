import express, { Request, Response } from "express";
import { TemplateService } from "../service/template";
import { ITemplate } from "../model/ITemplate";

const templateService = new TemplateService();

export const templateRouter = express.Router();

templateRouter.post("/presetTemplates", async (
    req: Request<{}, {}, Omit<ITemplate, 'category'>>,
    res: Response<String>
) => {
    try {
        if (req.session.user !== undefined) {
            await templateService.createPresetTemplate(req.body, req.session.user);
            res.status(200).send("Preset Template created successfully.");
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

templateRouter.post("/savedTemplates", async (
    req: Request<{}, {}, Omit<ITemplate, 'category'>>,
    res: Response<String>
) => {
    try {
        if (req.session.user !== undefined) {
            await templateService.createSavedTemplate(req.body, req.session.user);
            res.status(200).send("Saved Template created successfully.");
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

templateRouter.get("/getPresetTemplate", async (
    req: Request<{category: "preset"}, {}, {}>,
    res: Response<ITemplate[] | string>
) => {
    try {
        if (req.session.user !== undefined) {
            console.log(req.session.user);
            const reviews = await templateService.getTemplates(req.params.category);
            res.status(200).send(reviews);
        } else {
            res.status(400).send("You are not logged in.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

templateRouter.get("/getSavedTemplate", async (
    req: Request<{category: "saved"}, {}, {}>,
    res: Response<ITemplate[] | string>
) => {
    try {
        if (req.session.user !== undefined) {
            console.log(req.session.user);
            const reviews = await templateService.getTemplates(req.params.category);
            res.status(200).send(reviews);
        } else {
            res.status(400).send("You are not logged in.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

templateRouter.get("/single/:reviewId", async (
    req: Request<{ templateId: string }, {}, {}>,
    res: Response<ITemplate>
) => {
    try {
        console.log("Hello")
        const review = await templateService.getTemplate(req.params.templateId);
        res.status(200).send(review);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

templateRouter.put('/editTemplate', async (req: Request, res: Response) => {
    const templateId = req.params.id;
    const updatedTemplateData = req.body; // Assuming the updated template data is sent in the request body
    try {
        const updatedTemplate = await templateService.updateTemplate(templateId, updatedTemplateData);
        res.json(updatedTemplate);
    } catch (error) {
        console.error('Error updating template:', error);
        res.status(500).json({ error: 'An error occurred while updating the template' });
    }
});

templateRouter.delete('/deleteTemplate', async (req: Request, res: Response) => {
    const templateId = req.params.id;
    try {
        await templateService.deleteTemplate(templateId);
        res.sendStatus(204); // No content, successful deletion
    } catch (error) {
        console.error('Error deleting template:', error);
        res.status(500).json({ error: 'An error occurred while deleting the template' });
    }
});