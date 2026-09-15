import { useState } from "react";
import { Link } from "react-router-dom";

function PaperWorkspace() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "document", label: "Document" },
    { id: "ask", label: "Ask" },
    { id: "summary", label: "Summary" },
    { id: "analysis", label: "Analysis" },
    { id: "related", label: "Related Research" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <section>
        <Link
          to="/papers"
          className="inline-flex items-center text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-blue-600"
        >
          ← Back to Papers
        </Link>

        <p className="mt-5 text-sm font-medium text-blue-600">
          Research Workspace
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Attention Is All You Need
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Ashish Vaswani et al. • 2017 • NeurIPS
        </p>
      </section>

      {/* Tabs */}
      <section className="mt-8">
        <div className="border-b border-slate-200">
          <nav className="flex flex-wrap gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 pb-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <section className="mt-8">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                Paper Overview
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                This paper introduces the Transformer architecture, a model
                architecture based primarily on attention mechanisms for
                sequence modeling.
              </p>

              <span className="mt-4 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                Artificial Intelligence
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-base font-semibold text-slate-900">
                  Paper Details
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Authors
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Ashish Vaswani et al.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Publication Year
                  </p>
                  <p className="mt-1 text-sm text-slate-700">2017</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Journal / Venue
                  </p>
                  <p className="mt-1 text-sm text-slate-700">NeurIPS</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    DOI
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    10.48550/arXiv.1706.03762
                  </p>
                </div>
              </div>
            </div>

            {/* AI Research Tools */}
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                AI Research Tools
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Use AI-powered tools to explore this research paper.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("ask")}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Ask the Paper
                  </p>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    Ask questions and get answers grounded in the uploaded
                    research document.
                  </p>

                  <span className="mt-4 inline-block text-sm font-medium text-blue-600">
                    Open →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("summary")}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Generate Summary
                  </p>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    Generate an AI-powered summary of the research paper.
                  </p>

                  <span className="mt-4 inline-block text-sm font-medium text-blue-600">
                    Open →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("related")}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Related Research
                  </p>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    Discover related research papers and recommendations.
                  </p>

                  <span className="mt-4 inline-block text-sm font-medium text-blue-600">
                    Open →
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Document */}
        {activeTab === "document" && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Research Document
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              The uploaded PDF and document processing information will appear
              here.
            </p>

            <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-sm font-medium text-slate-700">
                No document connected yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Document information will be loaded from the backend.
              </p>
            </div>
          </div>
        )}

        {/* Ask */}
        {activeTab === "ask" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">
                Ask the Paper
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ask questions about this paper and receive grounded answers.
              </p>
            </div>

            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-700">
                Paper Q&A interface
              </p>

              <p className="mt-1 text-sm text-slate-400">
                The RAG-powered question interface will be connected here.
              </p>
            </div>

            <div className="border-t border-slate-200 p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Ask a question about this paper..."
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
                >
                  Ask
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {activeTab === "summary" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">
                Paper Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                AI-generated summary of the research paper.
              </p>
            </div>

            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-700">
                Summary will appear here
              </p>

              <p className="mt-1 text-sm text-slate-400">
                This section will be connected to the backend summary service.
              </p>
            </div>
          </div>
        )}

        {/* Analysis */}
        {activeTab === "analysis" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">
                Paper Analysis
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Explore structured analysis of the research paper.
              </p>
            </div>

            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-700">
                Analysis workspace
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Analysis functionality will be connected later.
              </p>
            </div>
          </div>
        )}

        {/* Related Research */}
        {activeTab === "related" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-base font-semibold text-slate-900">
                Related Research
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Research papers related to this publication.
              </p>
            </div>

            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-slate-700">
                Recommendations will appear here
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Semantic Scholar recommendations will be connected later.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default PaperWorkspace;