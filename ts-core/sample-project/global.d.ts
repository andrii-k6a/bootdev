declare global {
    interface Window {
        supportAI: SupportAI;
    }
}

interface SupportAI {
    version: string;
    enableAutoReply(): void;
}

export { };

