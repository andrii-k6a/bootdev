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
    rl.on("line", line => {
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

        command.callback(state);
        rl.prompt();
    });
};

