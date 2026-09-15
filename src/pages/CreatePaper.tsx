import { Link } from "react-router-dom";

function CreatePaper() {
  return (
    <div className="p-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Research Library
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Add Paper
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Add a research paper to your personal research library.
        </p>
      </section>

      {/* Form */}
      <section className="mt-8 max-w-4xl">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Paper Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the bibliographic information for your paper.
            </p>
          </div>

          <form className="space-y-6 p-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter paper title"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Authors */}
            <div>
              <label
                htmlFor="authors"
                className="block text-sm font-medium text-slate-700"
              >
                Authors
              </label>

              <input
                id="authors"
                name="authors"
                type="text"
                placeholder="e.g. Ashish Vaswani et al."
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Abstract */}
            <div>
              <label
                htmlFor="abstract"
                className="block text-sm font-medium text-slate-700"
              >
                Abstract
              </label>

              <textarea
                id="abstract"
                name="abstract"
                rows={6}
                placeholder="Enter the paper abstract"
                className="mt-2 w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Year + Journal */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="publication_year"
                  className="block text-sm font-medium text-slate-700"
                >
                  Publication Year
                </label>

                <input
                  id="publication_year"
                  name="publication_year"
                  type="number"
                  placeholder="e.g. 2024"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="journal"
                  className="block text-sm font-medium text-slate-700"
                >
                  Journal / Venue
                </label>

                <input
                  id="journal"
                  name="journal"
                  type="text"
                  placeholder="e.g. NeurIPS"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. Artificial Intelligence"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* DOI */}
            <div>
              <label
                htmlFor="doi"
                className="block text-sm font-medium text-slate-700"
              >
                DOI
              </label>

              <input
                id="doi"
                name="doi"
                type="text"
                placeholder="e.g. 10.48550/arXiv.1706.03762"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* PDF URL */}
            <div>
              <label
                htmlFor="pdf_url"
                className="block text-sm font-medium text-slate-700"
              >
                PDF URL
              </label>

              <input
                id="pdf_url"
                name="pdf_url"
                type="url"
                placeholder="https://example.com/paper.pdf"
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
              <Link
              to="/papers"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50"
            >
              Cancel
            </Link>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
              >
                Create Paper
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CreatePaper;