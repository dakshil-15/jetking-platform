import { register } from 'node:module';

/** Entry point for `node --import ./scripts/register-alias.mjs …`. */
register('./alias-hooks.mjs', import.meta.url);
