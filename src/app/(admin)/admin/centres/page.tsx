import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function Page() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('centres');
  return (
    <RecordEditor
      collection="centres"
      idKey="slug"
      initial={items}
      title="Centres"
    />
  );
}
