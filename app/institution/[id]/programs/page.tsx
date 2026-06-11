interface Props {
  params: { id: string };
}

export default function InstitutionPrograms({ params }: Props) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Programs for Institution: {params.id}
      </h1>

      <p className="text-gray-600">
        A list of programs for this institution will appear here.
      </p>
    </main>
  );
}
