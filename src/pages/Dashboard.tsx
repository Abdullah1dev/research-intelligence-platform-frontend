function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Research Intelligence
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Manage your research papers, documents, and AI-powered
          research workspace.
        </p>
      </section>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-slate-500">
            Total Papers
          </p>

          <p className="mt-2 text-3xl font-semibold text-slate-900">
            0
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Research papers in your library
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-slate-500">
            Documents
          </p>

          <p className="mt-2 text-3xl font-semibold text-slate-900">
            0
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Uploaded research documents
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-slate-500">
            Conversations
          </p>

          <p className="mt-2 text-3xl font-semibold text-slate-900">
            0
          </p>

          <p className="mt-2 text-xs text-slate-400">
            AI research conversations
          </p>
        </div>
      </section>

      {/* Recent Papers */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-base font-semibold text-slate-900">
            Recent Papers
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your recently added research papers will appear here.
          </p>
        </div>

        <div className="px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-600">
            No papers yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Add your first research paper to get started.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;