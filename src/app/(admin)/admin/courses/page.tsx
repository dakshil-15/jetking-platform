import { getAdminCollection, requireRole } from '../actions';
import { RecordEditor } from '../RecordEditor';
export default async function AdminCoursesPage() {
  await requireRole(['admin', 'editor']);
  const items = await getAdminCollection('courses');
  return (
    <RecordEditor
      collection="courses"
      idKey="slug"
      initial={items}
      title="Courses"
    />
  );
}
