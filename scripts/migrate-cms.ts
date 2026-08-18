/**
 * CLI: npm run migrate:cms
 * Seeds data/cms/store.json from repo fixtures (Admin CMS file store).
 */
import { resetCmsStoreFromFixtures } from '../src/lib/cms/store';

async function main() {
  const store = await resetCmsStoreFromFixtures();
  console.log('CMS store seeded:', {
    courses: store.courses.length,
    posts: store.posts.length,
    rules: store.persona_rules.length,
    variants: store.homepage_variants.length,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
