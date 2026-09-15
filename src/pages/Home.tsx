import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              Research Intelligence
            </h1>

            <p className="text-xs text-slate-500">
              AI-powered research workspace
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}

      <main>
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 text-center">
          <p className="text-sm font-medium text-blue-600">
            Research Intelligence Platform
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Understand research papers faster with AI
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500">
            Organize research papers, explore documents, ask
            questions, generate summaries, and discover related
            research from one workspace.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Features */}

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">
                  Research Library
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Keep your research papers organized and easily
                  searchable in one place.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">
                  AI Research Assistant
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ask questions about your research and interact
                  with your documents using AI.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">
                  Related Research
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Discover related papers and expand your research
                  with recommended literature.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;