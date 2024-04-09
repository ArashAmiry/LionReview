import { createConnection } from "mongoose";
import PASSWORD from "./password";


export const conn = createConnection(`mongodb+srv://boras:${process.env.PASSWORD}@kandidat.1uyabje.mongodb.net/?retryWrites=true&w=majority&appName=Kandidat`); 