import { Link } from "react-router-dom";
import PaperCard from "../components/PaperCard";

function Papers() {
  const papers = [
    {
      id: 1,
      title: "Attention Is All You Need",
      authors: "Ashish Vaswani et al.",
      publicationYear: 2017,
      journal: "NeurIPS",
      category: "Artificial Intelligence",
      doi: "10.48550/arXiv.1706.03762",
    },
    {
      id: 1,
      title: "BERT: Pre-training of Deep Bidirectional Transformers",
      authors: "Jacob Devlin et al.",
      publicationYear: 2019,
      journal: "NAACL",
      category: "Natural Language Processing",
      doi: "10.18653/v1/N19-1423",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <section>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Research Library
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Papers
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Search, organize, and explore your research papers.
            </p>
          </div>

          <Link
          to="/papers/new"
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md">
      Add Paper
    </Link>
        </div>
      </section>

      {/* Search */}
      <section className="mt-8">
        <input
          type="text"
          placeholder="Search papers by title or author..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </section>

      {/* Filters */}
      <section className="mt-4 flex flex-wrap gap-3">
        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>All Categories</option>
          <option>Artificial Intelligence</option>
          <option>Machine Learning</option>
          <option>Computer Vision</option>
          <option>Natural Language Processing</option>
        </select>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>All Years</option>
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>Sort by Created</option>
          <option>Title</option>
          <option>Publication Year</option>
        </select>

        <select className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500">
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </section>

      {/* Papers */}
      <section className="mt-8">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Your Papers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your research collection.
            </p>
          </div>

          {/* Paper Cards */}
          <div>
            {papers.map((paper) => (
              <PaperCard
                key={paper.doi}
                {...paper}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Papers;