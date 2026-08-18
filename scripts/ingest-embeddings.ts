/**
 * CLI: npm run ingest:embeddings
 * Chunks the active ContentSource, embeds with OpenAI, writes local/pgvector store.
 */
import { ingestCorpus } from '../src/guide/vector';
import { invalidateCorpus } from '../src/guide/corpus';
import { invalidateIndex } from '../src/guide/retrieve';

async function main() {
  invalidateCorpus();
  invalidateIndex();
  const result = await ingestCorpus();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
