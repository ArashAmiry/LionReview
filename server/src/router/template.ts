import express, { Request, Response } from "express";
import { TemplateService } from "../service/template";
import { ITemplate } from "../model/ITemplate";
import { log } from "console";
import mongoose from "mongoose";

const templateService = new TemplateService();

export const templateRouter = express.Router();


templateRouter.post("/createTemplate", async (
    req: Request<{}, {}, Omit<ITemplate, 'createdBy'>>,
    res: Response<String>
) => {
    try {
        if (req.session.user !== undefined) {
            await templateService.createTemplate(req.body, req.session.user);
            res.status(200).send("Saved Template created successfully.");
        }
    } catch (e: any) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send("At least one question is needed.");
            return;
        } else {
            res.status(500).send(e.message);
            return;
        }
    }
});


templateRouter.get("/getTemplates", async (
    req: Request<{}, {}, {}>,
    res: Response<ITemplate[] | string>
) => {
    try {
        if (req.session.user !== undefined) {
            console.log(req.session.user);
            const reviews = await templateService.getTemplates(req.session.user);
            res.status(200).send(reviews);
        } else {
            res.status(400).send("You are not logged in.");
        }

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

templateRouter.get("/single/:templateId", async (
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

templateRouter.put('/editTemplate/:templateId', async (
    req: Request<{ templateId: string }, {}, Partial<ITemplate>>,
    res: Response
) => {
    try {
        const updatedTemplateData = req.body;
        const updatedTemplate = await templateService.updateTemplate(req.params.templateId, updatedTemplateData);
        res.json(updatedTemplate);
    } catch (error) {
        console.error('Error updating template:', error);
        res.status(500).json({ error: 'An error occurred while updating the template' });
    }
});

templateRouter.delete('/deleteTemplate/:templateId', async (
    req: Request<{ templateId: string }, {}, {}>,
    res: Response) => {
    try {
        const deleteTemplate = await templateService.deleteTemplate(req.params.templateId);
        res.sendStatus(204); // No content, successful deletion
    } catch (error) {
        console.error('Error deleting template:', error);
        res.status(500).json({ error: 'An error occurred while deleting the template' });
    }
});