declare module 'express-session' {
    interface SessionData {
        user?: string; // Extend the Session interface with the user property
    }
}

export {};