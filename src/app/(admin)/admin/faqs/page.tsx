import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function Page() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('faqs');
  return (
    <RecordEditor
      collection="faqs"
      idKey="id"
      initial={items}
      title="FAQs"
    />
  );
}
