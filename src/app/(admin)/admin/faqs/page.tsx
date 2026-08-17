import { redirect } from 'next/navigation';
import type { Route } from 'next';
import { getAdminCollection, isAdminAuthenticated } from '../actions';
import { JsonEditor } from '../JsonEditor';

export default async function Page() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as Route);
  const items = await getAdminCollection('faqs');
  return <JsonEditor collection="faqs" idKey="id" initial={items} title="FAQs" />;
}
