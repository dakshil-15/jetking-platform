import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function Page() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('faculty');
  return (
    <RecordEditor
      collection="faculty"
      idKey="slug"
      initial={items}
      title="Faculty"
    />
  );
}
