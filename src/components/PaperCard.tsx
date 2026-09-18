import { Link } from "react-router-dom";

interface PaperCardProps {
  id: number;
  title: string;
  authors: string;
  publicationYear: number;
  journal: string;
  category: string;
  doi: string | null;
}

function PaperCard({
  id,
  title,
  authors,
  publicationYear,
  journal,
  category,
  doi,
}: PaperCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Document Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 2v6h6"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 13h8M8 17h6"
            />
          </svg>
        </div>

        {/* Paper Information */}
        <div className="min-w-0 flex-1">
          {/* Category + PDF indicator */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              {category}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Research Paper
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-900">
            {title}
          </h3>

          {/* Authors */}
          <p className="mt-1.5 text-sm text-slate-600">
            {authors}
          </p>

          {/* Metadata */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">
              {publicationYear}
            </span>

            <span className="text-slate-300">
              •
            </span>

            <span>{journal}</span>
          </div>

          {/* DOI */}
          {doi && (
            <div className="mt-3 flex items-start gap-2">
              <span className="shrink-0 text-xs font-medium text-slate-400">
                DOI
              </span>

              <p className="min-w-0 break-all text-xs text-slate-500">
                {doi}
              </p>
            </div>
          )}

          {!doi && (
            <p className="mt-3 text-xs text-slate-400">
              No DOI provided
            </p>
          )}
        </div>

        {/* Open Button */}
        <div className="shrink-0">
          <Link
            to={`/papers/${id}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow"
          >
            Open

            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 010-1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PaperCard;