import { createInterface } from 'node:readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export function cleanInput(input: string): string[] {
    return input.toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(i => i.length > 0);
};

export function startREPL() {
    rl.prompt();
    rl.on("line", line => {
        const input = cleanInput(line);
        if (input.length === 0) {
            rl.prompt();
            return;
        }
        console.log(`Your command was: ${input[0]}`);
        rl.prompt();
    });
};

