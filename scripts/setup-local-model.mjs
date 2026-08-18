/**
 * Provision the local Ollama model used by Jetking AI.
 *
 * This creates a reproducible model profile; Jetking facts remain in the RAG
 * index so they can be refreshed without expensive fine-tuning.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const MODELFILE = resolve(ROOT, 'models/jetking-assistant.Modelfile');
const BASE_MODEL = 'llama3.2:3b';
const MODEL_NAME = process.env.OLLAMA_MODEL?.trim() || 'jetking-assistant';
const WINDOWS_OLLAMA = process.env.LOCALAPPDATA
  ? resolve(process.env.LOCALAPPDATA, 'Programs', 'Ollama', 'ollama.exe')
  : '';
const OLLAMA =
  process.platform === 'win32' && existsSync(WINDOWS_OLLAMA) ? WINDOWS_OLLAMA : 'ollama';

function run(args) {
  const result = spawnSync(OLLAMA, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: 'inherit',
  });

  if (result.error?.code === 'ENOENT') {
    console.error(
      'Ollama is not installed. Install it from https://ollama.com/download/windows, then rerun this command.',
    );
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log(`Pulling base model: ${BASE_MODEL}`);
run(['pull', BASE_MODEL]);

console.log(`Creating local model profile: ${MODEL_NAME}`);
run(['create', MODEL_NAME, '-f', MODELFILE]);

console.log(`Local model ready: ${MODEL_NAME}`);
console.log('Run `npm run model:check` to verify both general and Jetking-grounded answers.');
