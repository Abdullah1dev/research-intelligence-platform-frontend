import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPapers } from "../api/papers";
import type { Paper } from "../api/papers";

function Dashboard() {
  const [recentPapers, setRecentPapers] = useState<Paper[]>([]);
  const [totalPapers, setTotalPapers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const response = await getPapers({
          page: 1,
          limit: 5,
          sort_by: "created_at",
          order: "desc",
        });

        setRecentPapers(response.items);
        setTotalPapers(response.total);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const latestPublicationYear =
    recentPapers.length > 0
      ? Math.max(
          ...recentPapers.map(
            (paper) => paper.publication_year,
          ),
        )
      : null;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-indigo-600">
            Research Intelligence Platform
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Research Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your research papers, explore documents,
            and use AI-powered tools to analyze your research.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Papers */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Papers
                </p>

                {loading ? (
                  <div className="mt-3 h-9 w-20 animate-pulse rounded-lg bg-slate-100" />
                ) : (
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {totalPapers}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  Papers in your research library
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 4.5A2.5 2.5 0 018.5 2h9A2.5 2.5 0 0120 4.5v15A2.5 2.5 0 0117.5 22h-9A2.5 2.5 0 016 19.5v-15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6h7M9 10h7M9 14h5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Papers */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Recent Papers
                </p>

                {loading ? (
                  <div className="mt-3 h-9 w-20 animate-pulse rounded-lg bg-slate-100" />
                ) : (
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {recentPapers.length}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  Latest papers added to your library
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Latest Publication */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Latest Publication
                </p>

                {loading ? (
                  <div className="mt-3 h-9 w-20 animate-pulse rounded-lg bg-slate-100" />
                ) : (
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {latestPublicationYear ?? "—"}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  From your recently added papers
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 19V5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5c4-3 7 3 11 0v8c-4 3-7-3-11 0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Recent Papers */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Recent Papers
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your most recently added research papers
                  </p>
                </div>

                <Link
                  to="/papers"
                  className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {loading ? (
                  <>
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="px-6 py-5"
                      >
                        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
                        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                      </div>
                    ))}
                  </>
                ) : recentPapers.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 4.5A2.5 2.5 0 018.5 2h9A2.5 2.5 0 0120 4.5v15A2.5 2.5 0 0117.5 22h-9A2.5 2.5 0 016 19.5v-15z"
                        />
                      </svg>
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-900">
                      No papers yet
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Add your first research paper to get started.
                    </p>

                    <Link
                      to="/papers/new"
                      className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                      Add Paper
                    </Link>
                  </div>
                ) : (
                  recentPapers.map((paper) => (
                    <Link
                      key={paper.id}
                      to={`/papers/${paper.id}`}
                      className="block px-6 py-5 transition hover:bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-slate-900">
                            {paper.title}
                          </h3>

                          <p className="mt-1 truncate text-sm text-slate-500">
                            {paper.authors}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                              {paper.category}
                            </span>

                            <span className="text-xs text-slate-400">
                              {paper.publication_year}
                            </span>

                            {paper.journal && (
                              <span className="truncate text-xs text-slate-400">
                                {paper.journal}
                              </span>
                            )}
                          </div>
                        </div>

                        <svg
                          className="mt-1 h-5 w-5 shrink-0 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 18l6-6-6-6"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Continue working with your research.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/papers/new"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Add Paper
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Add a new research paper
                    </p>
                  </div>
                </Link>

                <Link
                  to="/papers"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17.5v-11z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 8h8M8 12h8M8 16h5"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Browse Papers
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Explore your research library
                    </p>
                  </div>
                </Link>

                <Link
                  to="/assistant"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-violet-200 hover:bg-violet-50/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3.5a8.5 8.5 0 018.5 8.5c0 4.7-3.8 8.5-8.5 8.5a8.5 8.5 0 01-3.2-.6L4 21l1.1-4.3A8.4 8.4 0 013.5 12 8.5 8.5 0 0112 3.5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.5 12h.01M12 12h.01M15.5 12h.01"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      AI Assistant
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Ask questions about your research
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;