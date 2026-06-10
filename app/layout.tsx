import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { fetchInstitution } from '@/lib/api';

export default async function InstitutionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const institution = await fetchInstitution(params.id);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar institutionId={params.id} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Institution Dashboard" institutionName={institution.name} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
