import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function Page() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('persona_rules');
  return (
    <RecordEditor
      collection="persona_rules"
      idKey="id"
      initial={items}
      title="Persona rules"
    />
  );
}
