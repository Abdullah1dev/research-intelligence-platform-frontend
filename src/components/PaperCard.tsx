interface PaperCardProps {
  title: string;
  authors: string;
  publicationYear: number;
  journal: string;
  category: string;
  doi: string;
}

function PaperCard({
  title,
  authors,
  publicationYear,
  journal,
  category,
  doi,
}: PaperCardProps) {
  return (
    <article className="border-b border-slate-200 p-6 last:border-b-0">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            {authors}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
            <span>{publicationYear}</span>

            <span>•</span>

            <span>{journal}</span>

            <span>•</span>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
              {category}
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            DOI: {doi}
          </p>
        </div>

        <button className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
          Open
        </button>
      </div>
    </article>
  );
}

export default PaperCard;