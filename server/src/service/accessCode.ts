import { accessModel } from "../db/accessCode.db";

export class AccessCode {
    // The individual code is the ObjectID in mongoDB
    async generateIndividualAccessCode(reviewID: string): Promise<string> {
        const res = await accessModel.create({
            reviewId: reviewID
        })
        return res._id.toString();

    }

    async getReviewIDFromAccessCode(accessCode: string) {
        const result = await accessModel.findById(accessCode).exec();
        return result
    }

    async checkCodeStatus(accessCode: string, reviewID: string): Promise<Boolean | undefined> {
        try {
            console.log(accessCode + "ACCCESSSS");
            const result = await accessModel.findById(accessCode).exec();
            if (result !== null && result.reviewId === reviewID) {
                console.log(result.completed + "RESULLLTTT");
                return result.completed;
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async setCodeUsed(accessCode: string) {
        await accessModel.findByIdAndUpdate(accessCode, {
            completed: true
        })
    }
}