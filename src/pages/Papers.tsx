import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import PaperCard from "../components/PaperCard";

import {
  getPapers,
} from "../api/papers";

import type {
  Paper,
} from "../api/papers";


function Papers() {
  // -----------------------------
  // Papers data
  // -----------------------------

  const [papers, setPapers] = useState<Paper[]>(
    [],
  );

  const [total, setTotal] = useState(0);

  const [totalPages, setTotalPages] =
    useState(0);


  // -----------------------------
  // Loading and error
  // -----------------------------

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // -----------------------------
  // Search and filters
  // -----------------------------

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [publicationYear, setPublicationYear] =
    useState("");


  // -----------------------------
  // Sorting
  // -----------------------------

  const [sortBy, setSortBy] = useState<
    "title" |
    "publication_year" |
    "created_at"
  >("created_at");

  const [order, setOrder] =
    useState<"asc" | "desc">(
      "desc",
    );


  // -----------------------------
  // Pagination
  // -----------------------------

  const [page, setPage] =
    useState(1);

  const limit = 10;


  // -----------------------------
  // Load papers
  // -----------------------------

  useEffect(() => {
    const timeoutId =
      setTimeout(() => {
        async function loadPapers() {
          try {
            setIsLoading(true);
            setError("");

            const response =
              await getPapers({
                page,
                limit,
                search,
                category,
                publication_year:
                  publicationYear
                    ? Number(
                        publicationYear,
                      )
                    : undefined,
                sort_by: sortBy,
                order,
              });

            setPapers(
              response.items,
            );

            setTotal(
              response.total,
            );

            setTotalPages(
              response.total_pages,
            );
          } catch (error) {
            setError(
              error instanceof Error
                ? error.message
                : "Unable to load papers.",
            );
          } finally {
            setIsLoading(false);
          }
        }

        loadPapers();
      }, 400);

    return () =>
      clearTimeout(timeoutId);
  }, [
    page,
    search,
    category,
    publicationYear,
    sortBy,
    order,
  ]);


  // -----------------------------
  // Search change
  // -----------------------------

  function handleSearchChange(
    value: string,
  ) {
    setSearch(value);
    setPage(1);
  }


  // -----------------------------
  // Category change
  // -----------------------------

  function handleCategoryChange(
    value: string,
  ) {
    setCategory(value);
    setPage(1);
  }


  // -----------------------------
  // Year change
  // -----------------------------

  function handleYearChange(
    value: string,
  ) {
    setPublicationYear(value);
    setPage(1);
  }


  // -----------------------------
  // Sort field change
  // -----------------------------

  function handleSortChange(
    value:
      | "title"
      | "publication_year"
      | "created_at",
  ) {
    setSortBy(value);
    setPage(1);
  }


  // -----------------------------
  // Sort order change
  // -----------------------------

  function handleOrderChange(
    value: "asc" | "desc",
  ) {
    setOrder(value);
    setPage(1);
  }


  // -----------------------------
  // Previous page
  // -----------------------------

  function handlePreviousPage() {
    if (page > 1) {
      setPage(
        (currentPage) =>
          currentPage - 1,
      );
    }
  }


  // -----------------------------
  // Next page
  // -----------------------------

  function handleNextPage() {
    if (
      totalPages > 0 &&
      page < totalPages
    ) {
      setPage(
        (currentPage) =>
          currentPage + 1,
      );
    }
  }


  return (
    <div className="p-8">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <section>
        <div className="flex items-start justify-between gap-6">

          <div>
            <p className="text-sm font-medium text-blue-600">
              Research Library
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              Papers
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Search, organize, and explore
              your research papers.
            </p>
          </div>


          <Link
            to="/papers/new"
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
          >
            Add Paper
          </Link>

        </div>
      </section>


      {/* ========================= */}
      {/* Search */}
      {/* ========================= */}

      <section className="mt-8">

        <input
          type="text"
          value={search}
          onChange={(event) =>
            handleSearchChange(
              event.target.value,
            )
          }
          placeholder="Search papers by title or author..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

      </section>


      {/* ========================= */}
      {/* Filters */}
      {/* ========================= */}

      <section className="mt-4 flex flex-wrap gap-3">

        {/* Category */}

        <select
          value={category}
          onChange={(event) =>
            handleCategoryChange(
              event.target.value,
            )
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition-colors duration-200 focus:border-blue-500"
        >
          <option value="">
            All Categories
          </option>

          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>

          <option value="Machine Learning">
            Machine Learning
          </option>

          <option value="Computer Vision">
            Computer Vision
          </option>

          <option value="Natural Language Processing">
            Natural Language Processing
          </option>
        </select>


        {/* Publication year */}

        <select
          value={publicationYear}
          onChange={(event) =>
            handleYearChange(
              event.target.value,
            )
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition-colors duration-200 focus:border-blue-500"
        >
          <option value="">
            All Years
          </option>

          <option value="2026">
            2026
          </option>

          <option value="2025">
            2025
          </option>

          <option value="2024">
            2024
          </option>

          <option value="2023">
            2023
          </option>

          <option value="2022">
            2022
          </option>

          <option value="2021">
            2021
          </option>
        </select>


        {/* Sort field */}

        <select
          value={sortBy}
          onChange={(event) =>
            handleSortChange(
              event.target.value as
                | "title"
                | "publication_year"
                | "created_at",
            )
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition-colors duration-200 focus:border-blue-500"
        >
          <option value="created_at">
            Sort by Created
          </option>

          <option value="title">
            Sort by Title
          </option>

          <option value="publication_year">
            Sort by Publication Year
          </option>
        </select>


        {/* Sort order */}

        <select
          value={order}
          onChange={(event) =>
            handleOrderChange(
              event.target.value as
                | "asc"
                | "desc",
            )
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition-colors duration-200 focus:border-blue-500"
        >
          <option value="desc">
            Newest First
          </option>

          <option value="asc">
            Oldest First
          </option>
        </select>

      </section>


      {/* ========================= */}
      {/* Results */}
      {/* ========================= */}

      <section className="mt-8">

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          {/* Results header */}

          <div className="border-b border-slate-200 px-6 py-5">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="text-base font-semibold text-slate-900">
                  Your Papers
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your research collection.
                </p>

              </div>


              {!isLoading &&
                !error && (
                  <p className="text-sm text-slate-400">
                    {total}{" "}
                    {total === 1
                      ? "paper"
                      : "papers"}
                  </p>
                )}

            </div>

          </div>


          {/* ========================= */}
          {/* Loading */}
          {/* ========================= */}

          {isLoading && (
            <div className="px-6 py-16 text-center">

              <p className="text-sm text-slate-500">
                Loading papers...
              </p>

            </div>
          )}


          {/* ========================= */}
          {/* Error */}
          {/* ========================= */}

          {!isLoading &&
            error && (
              <div className="px-6 py-16 text-center">

                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Please try again.
                </p>

              </div>
            )}


          {/* ========================= */}
          {/* Empty */}
          {/* ========================= */}

          {!isLoading &&
            !error &&
            papers.length === 0 && (
              <div className="px-6 py-16 text-center">

                <p className="text-sm font-medium text-slate-700">
                  No papers found.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Try changing your search
                  or filters.
                </p>

              </div>
            )}


          {/* ========================= */}
          {/* Paper list */}
          {/* ========================= */}

          {!isLoading &&
            !error &&
            papers.map((paper) => (
              <PaperCard
                key={paper.id}
                id={paper.id}
                title={paper.title}
                authors={paper.authors}
                publicationYear={
                  paper.publication_year
                }
                journal={paper.journal}
                category={paper.category}
                doi={paper.doi}
              />
            ))}


          {/* ========================= */}
          {/* Pagination */}
          {/* ========================= */}

          {!isLoading &&
            !error &&
            totalPages > 0 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">

                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-medium text-slate-700">
                    {page}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-700">
                    {totalPages}
                  </span>
                </p>


                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={
                      handlePreviousPage
                    }
                    disabled={page === 1}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>


                  <button
                    type="button"
                    onClick={
                      handleNextPage
                    }
                    disabled={
                      page === totalPages
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>

                </div>

              </div>
            )}

        </div>

      </section>

    </div>
  );
}

export default Papers;