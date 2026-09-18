import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { createPaper } from "../api/papers";
import { uploadPaperDocument } from "../api/documents";

function CreatePaper() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [journal, setJournal] = useState("");
  const [doi, setDoi] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setSelectedFile(null);
      setError("Please select a PDF file.");
      return;
    }

    setError("");
    setSelectedFile(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!selectedFile) {
      setError("Please upload the research paper PDF.");
      return;
    }

    if (!publicationYear) {
      setError("Please enter the publication year.");
      return;
    }

    try {
      setSubmitting(true);

      const paper = await createPaper({
        title: title.trim(),
        abstract: abstract.trim(),
        authors: authors.trim(),
        publication_year: Number(publicationYear),
        journal: journal.trim(),
        doi: doi.trim() || undefined,
        category: category.trim(),
      });

      await uploadPaperDocument(
        paper.id,
        selectedFile,
      );

      navigate(`/papers/${paper.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create the paper.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-full bg-slate-50 px-6 py-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Research Library
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Add Paper
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Add a research paper to your library and
          upload its PDF for AI-powered research,
          analysis, and question answering.
        </p>
      </section>

      {/* Form */}
      <section className="mt-8 max-w-4xl">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Form Header */}
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Paper Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Fields marked with{" "}
              <span className="font-medium text-red-500">
                *
              </span>{" "}
              are required.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >
            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700"
              >
                Title{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Enter paper title"
                required
                disabled={submitting}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            {/* Authors */}
            <div>
              <label
                htmlFor="authors"
                className="block text-sm font-medium text-slate-700"
              >
                Authors{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                id="authors"
                name="authors"
                type="text"
                value={authors}
                onChange={(event) =>
                  setAuthors(event.target.value)
                }
                placeholder="e.g. Ashish Vaswani et al."
                required
                disabled={submitting}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            {/* Abstract */}
            <div>
              <label
                htmlFor="abstract"
                className="block text-sm font-medium text-slate-700"
              >
                Abstract{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <textarea
                id="abstract"
                name="abstract"
                rows={7}
                value={abstract}
                onChange={(event) =>
                  setAbstract(event.target.value)
                }
                placeholder="Enter the paper abstract"
                required
                disabled={submitting}
                className="mt-2 w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            {/* Year + Journal */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Publication Year */}
              <div>
                <label
                  htmlFor="publication_year"
                  className="block text-sm font-medium text-slate-700"
                >
                  Publication Year{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="publication_year"
                  name="publication_year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={publicationYear}
                  onChange={(event) =>
                    setPublicationYear(
                      event.target.value,
                    )
                  }
                  placeholder="e.g. 2024"
                  required
                  disabled={submitting}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                />
              </div>

              {/* Journal */}
              <div>
                <label
                  htmlFor="journal"
                  className="block text-sm font-medium text-slate-700"
                >
                  Journal / Venue{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="journal"
                  name="journal"
                  type="text"
                  value={journal}
                  onChange={(event) =>
                    setJournal(event.target.value)
                  }
                  placeholder="e.g. NeurIPS"
                  required
                  disabled={submitting}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700"
              >
                Category{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                placeholder="e.g. Artificial Intelligence"
                required
                disabled={submitting}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            {/* DOI */}
            <div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="doi"
                  className="block text-sm font-medium text-slate-700"
                >
                  DOI
                </label>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                  Optional
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Add the DOI if the paper has one.
              </p>

              <input
                id="doi"
                name="doi"
                type="text"
                value={doi}
                onChange={(event) =>
                  setDoi(event.target.value)
                }
                placeholder="e.g. 10.48550/arXiv.1706.03762"
                disabled={submitting}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
              />
            </div>

            {/* PDF Upload */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="paper_file"
                      className="block text-sm font-semibold text-slate-900"
                    >
                      Research Paper PDF{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600">
                      Required
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Upload the actual PDF document.
                    It will be processed for research
                    and AI-powered features.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="paper_file"
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-9 text-center transition-all duration-200 ${
                    selectedFile
                      ? "border-blue-300 bg-blue-50/40"
                      : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg font-medium text-blue-600">
                    ↑
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-700">
                    {selectedFile
                      ? selectedFile.name
                      : "Choose a PDF file"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedFile
                      ? `${(
                          selectedFile.size /
                          (1024 * 1024)
                        ).toFixed(2)} MB`
                      : "PDF files only"}
                  </p>

                  <input
                    id="paper_file"
                    name="paper_file"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    disabled={submitting}
                    className="sr-only"
                  />
                </label>

                {selectedFile && (
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-700">
                        {selectedFile.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        PDF document selected
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedFile(null)
                      }
                      disabled={submitting}
                      className="ml-4 shrink-0 text-xs font-medium text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
              <Link
                to="/papers"
                className={`rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 ${
                  submitting
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? "Creating & Uploading..."
                  : "Create Paper"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CreatePaper;