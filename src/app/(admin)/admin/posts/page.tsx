import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function Page() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('posts');
  return (
    <RecordEditor
      collection="posts"
      idKey="slug"
      initial={items}
      title="Posts & news"
    />
  );
}
