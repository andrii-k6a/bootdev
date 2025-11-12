import type { CommandRegistry } from "./commands/commands";
import { registerCommand, runCommand } from "./commands/commands";
import { handleLogin } from "./commands/command_login";

function main() {
    const input = process.argv.slice(2);

    if (input.length === 0) {
        console.log("No command to run");
        process.exit(1);
    }

    const cmdName = input[0];
    const args = input.slice(1);

    const registry: CommandRegistry = {};

    registerCommand(registry, "login", handleLogin);

    try {
        runCommand(registry, cmdName, ...args);
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Failed to run command: ${err.message}`);
        } else {
            console.log(`Failed to run command: ${err}`);
        }
        process.exit(1);
    }
}

main();

