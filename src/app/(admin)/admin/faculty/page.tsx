import { redirect } from 'next/navigation';
import type { Route } from 'next';
import { getAdminCollection, isAdminAuthenticated } from '../actions';
import { JsonEditor } from '../JsonEditor';

export default async function Page() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as Route);
  const items = await getAdminCollection('faculty');
  return <JsonEditor collection="faculty" idKey="slug" initial={items} title="Faculty" />;
}
