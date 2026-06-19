import type { InstitutionDocument } from "@/types/institution-document"

export function DocumentCard({ doc }: { doc: InstitutionDocument }) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-medium">{doc.name}</h3>
          <p className="text-xs text-muted-foreground">
            {doc.type.replace("_", " ")}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(doc.uploaded_at).toLocaleDateString()}
        </span>
      </header>

      <a
        href={doc.url}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        View document
      </a>

      {doc.uploaded_by && (
        <p className="text-xs text-muted-foreground">
          Uploaded by: {doc.uploaded_by}
        </p>
      )}
    </article>
  )
}