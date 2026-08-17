import { redirect } from 'next/navigation';
import type { Route } from 'next';
import { getAdminCollection, isAdminAuthenticated } from '../actions';
import { JsonEditor } from '../JsonEditor';

export default async function Page() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as Route);
  const items = await getAdminCollection('persona_rules');
  return (
    <JsonEditor collection="persona_rules" idKey="id" initial={items} title="Persona rules" />
  );
}
