function PaperWorkspace() {
  return (
    <div className="p-8">
      {/* Header */}

      <section>
        <p className="text-sm font-medium text-blue-600">
          Research Workspace
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Attention Is All You Need
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Ashish Vaswani et al. • 2017 • NeurIPS
        </p>
      </section>

      {/* Workspace navigation */}

      <section className="mt-8">
        <div className="border-b border-slate-200">
          <nav className="flex gap-6">
            <button className="border-b-2 border-blue-600 px-1 pb-3 text-sm font-medium text-blue-600">
              Overview
            </button>

            <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-slate-500 transition-colors duration-200 hover:border-slate-300 hover:text-slate-900">
              Document
            </button>

            <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-slate-500 transition-colors duration-200 hover:border-slate-300 hover:text-slate-900">
              Ask
            </button>

            <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-slate-500 transition-colors duration-200 hover:border-slate-300 hover:text-slate-900">
              Summary
            </button>

            <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-slate-500 transition-colors duration-200 hover:border-slate-300 hover:text-slate-900">
              Analysis
            </button>

            <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-slate-500 transition-colors duration-200 hover:border-slate-300 hover:text-slate-900">
              Related Research
            </button>
          </nav>
        </div>
      </section>

      {/* Overview */}

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">
            Paper Overview
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            This paper introduces the Transformer architecture, a
            model architecture based entirely on attention mechanisms
            without relying on recurrence or convolution.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            The paper presents the architecture, training approach,
            and experimental results demonstrating its effectiveness
            for sequence transduction tasks.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Paper Details
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Publication Year
              </p>

              <p className="mt-1 text-sm text-slate-700">
                2017
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Venue
              </p>

              <p className="mt-1 text-sm text-slate-700">
                NeurIPS
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Category
              </p>

              <span className="mt-1 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                Artificial Intelligence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI capabilities */}

      <section className="mt-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            AI Research Tools
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Explore this paper using the platform's AI capabilities.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Ask the Paper
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ask questions and get answers grounded in the
                uploaded paper.
              </p>

              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
                Ask a question →
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Generate Summary
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Generate an AI-powered summary of the research
                paper.
              </p>

              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
                View summary →
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Related Research
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Discover related research papers using Semantic
                Scholar recommendations.
              </p>

              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
                Explore papers →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaperWorkspace;