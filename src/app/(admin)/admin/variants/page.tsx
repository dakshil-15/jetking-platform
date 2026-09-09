import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function Page() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('homepage_variants');
  return (
    <RecordEditor
      collection="homepage_variants"
      idKey="id"
      initial={items}
      title="Homepage variants"
    />
  );
}
