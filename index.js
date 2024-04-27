import { createRequire } from "module";
import { Ollama } from "ollama-node";
const require = createRequire(import.meta.url);

const readline = require('readline');
const ollama = new Ollama();
await ollama.setModel('llama3');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const print = (word) => {
    process.stdout.write(word);
}

while(true) {
    let user_input = await prompt("[bot]: How can I help you today?\n[user]: ");
    process.stdout.write("[bot]: ");
    if (user_input === '\\bye') {
        process.stdout.write('Bye, Bye!!!');
        process.exit(0);
    }
    await ollama.streamingGenerate(user_input, print);
    user_input = "";
};