import type { State } from "./state.ts";

export function cleanInput(input: string): string[] {
    return input.toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(i => i.length > 0);
};

export function startREPL(state: State) {
    const rl = state.interface;
    const commands = state.commands;

    rl.prompt();
    rl.on("line", async line => {
        const input = cleanInput(line);
        if (input.length === 0) {
            rl.prompt();
            return;
        }

        const command = commands[input[0]];
        if (!command) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }

        try {
            await command.callback(state);
        } catch (err) {
            if (err instanceof Error) {
                console.log(`Command execution faile: ${err.message}`);
            } else {
                console.log(`Command execution faile: ${err}`);
            }
        }

        rl.prompt();
    });
};

