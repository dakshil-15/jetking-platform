import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function Page() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('policies');
  return (
    <RecordEditor
      collection="policies"
      idKey="slug"
      initial={items}
      title="Policies"
    />
  );
}
