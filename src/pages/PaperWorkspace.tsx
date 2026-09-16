import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  askPaper,
  getPaper,
} from "../api/papers";

import type {
  Paper,
  PaperAskSource,
} from "../api/papers";

import { getPaperDocument } from "../api/documents";

import type {
  PaperDocument,
} from "../api/documents";


function PaperWorkspace() {
  const { paperId } = useParams();

  // -----------------------------
  // Active tab
  // -----------------------------

  const [activeTab, setActiveTab] =
    useState("overview");


  // -----------------------------
  // Paper
  // -----------------------------

  const [paper, setPaper] =
    useState<Paper | null>(null);

  const [isLoadingPaper, setIsLoadingPaper] =
    useState(true);

  const [paperError, setPaperError] =
    useState("");


  // -----------------------------
  // Document
  // -----------------------------

  const [document, setDocument] =
    useState<PaperDocument | null>(null);

  const [isLoadingDocument, setIsLoadingDocument] =
    useState(false);

  const [documentError, setDocumentError] =
    useState("");


  // -----------------------------
  // Ask the Paper
  // -----------------------------

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [sources, setSources] =
    useState<PaperAskSource[]>([]);

  const [isAsking, setIsAsking] =
    useState(false);

  const [askError, setAskError] =
    useState("");


  // -----------------------------
  // Workspace tabs
  // -----------------------------

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "document",
      label: "Document",
    },
    {
      id: "ask",
      label: "Ask",
    },
    {
      id: "summary",
      label: "Summary",
    },
    {
      id: "analysis",
      label: "Analysis",
    },
    {
      id: "related",
      label: "Related Research",
    },
  ];


  // =========================================================
  // Load paper
  // =========================================================

  useEffect(() => {
    async function loadPaper() {
      if (!paperId) {
        setPaperError(
          "Paper ID is missing.",
        );

        setIsLoadingPaper(false);

        return;
      }

      try {
        setIsLoadingPaper(true);
        setPaperError("");

        const response =
          await getPaper(
            Number(paperId),
          );

        setPaper(response);
      } catch (error) {
        setPaperError(
          error instanceof Error
            ? error.message
            : "Unable to load paper.",
        );
      } finally {
        setIsLoadingPaper(false);
      }
    }

    loadPaper();
  }, [paperId]);


  // =========================================================
  // Load document when Document tab is opened
  // =========================================================

  useEffect(() => {
    async function loadDocument() {
      if (
        !paperId ||
        activeTab !== "document"
      ) {
        return;
      }

      try {
        setIsLoadingDocument(true);
        setDocumentError("");

        const response =
          await getPaperDocument(
            Number(paperId),
          );

        setDocument(response);
      } catch (error) {
        setDocumentError(
          error instanceof Error
            ? error.message
            : "Unable to load document.",
        );
      } finally {
        setIsLoadingDocument(false);
      }
    }

    loadDocument();
  }, [
    paperId,
    activeTab,
  ]);


  // =========================================================
  // Ask the paper
  // =========================================================

  async function handleAsk() {
    if (
      !paperId ||
      !question.trim()
    ) {
      return;
    }

    try {
      setIsAsking(true);
      setAskError("");

      const response =
        await askPaper(
          Number(paperId),
          question.trim(),
        );

      setAnswer(response.answer);

      setSources(
        response.sources,
      );
    } catch (error) {
      setAskError(
        error instanceof Error
          ? error.message
          : "Unable to get an answer.",
      );
    } finally {
      setIsAsking(false);
    }
  }


  // =========================================================
  // Loading paper
  // =========================================================

  if (isLoadingPaper) {
    return (
      <div className="p-8">

        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">

          <p className="text-sm text-slate-500">
            Loading paper...
          </p>

        </div>

      </div>
    );
  }


  // =========================================================
  // Paper error
  // =========================================================

  if (paperError) {
    return (
      <div className="p-8">

        <Link
          to="/papers"
          className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-blue-600"
        >
          ← Back to Papers
        </Link>


        <div className="mt-8 rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">

          <p className="text-sm font-medium text-red-600">
            {paperError}
          </p>

        </div>

      </div>
    );
  }


  if (!paper) {
    return null;
  }


  return (
    <div className="p-8">

      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

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
          {paper.title}
        </h1>


        <p className="mt-2 text-sm text-slate-500">
          {paper.authors} •{" "}
          {paper.publication_year} •{" "}
          {paper.journal}
        </p>

      </section>


      {/* ===================================================== */}
      {/* Tabs */}
      {/* ===================================================== */}

      <section className="mt-8">

        <div className="border-b border-slate-200">

          <nav className="flex flex-wrap gap-6">

            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab.id,
                  )
                }
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


      {/* ===================================================== */}
      {/* Tab Content */}
      {/* ===================================================== */}

      <section className="mt-8">


        {/* =================================================== */}
        {/* OVERVIEW */}
        {/* =================================================== */}

        {activeTab === "overview" && (
          <div className="space-y-6">


            {/* Paper overview */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-base font-semibold text-slate-900">
                Paper Overview
              </h2>


              <p className="mt-3 text-sm leading-6 text-slate-600">
                {paper.abstract ||
                  "No abstract available for this paper."}
              </p>


              <span className="mt-4 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                {paper.category}
              </span>

            </div>


            {/* Paper details */}

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-6 py-5">

                <h2 className="text-base font-semibold text-slate-900">
                  Paper Details
                </h2>

              </div>


              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">


                {/* Authors */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Authors
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {paper.authors}
                  </p>

                </div>


                {/* Publication year */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Publication Year
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {paper.publication_year}
                  </p>

                </div>


                {/* Journal */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Journal / Venue
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {paper.journal}
                  </p>

                </div>


                {/* DOI */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    DOI
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-700">
                    {paper.doi}
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


                {/* Ask */}

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      "ask",
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >

                  <p className="text-sm font-semibold text-slate-900">
                    Ask the Paper
                  </p>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    Ask questions and get answers grounded in the uploaded research document.
                  </p>

                  <span className="mt-4 inline-block text-sm font-medium text-blue-600">
                    Open →
                  </span>

                </button>


                {/* Summary */}

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      "summary",
                    )
                  }
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


                {/* Related research */}

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      "related",
                    )
                  }
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


        {/* =================================================== */}
        {/* DOCUMENT */}
        {/* =================================================== */}

        {activeTab === "document" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">


            {/* Header */}

            <div className="border-b border-slate-200 px-6 py-5">

              <h2 className="text-base font-semibold text-slate-900">
                Research Document
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Uploaded PDF and document processing information.
              </p>

            </div>


            {/* Loading */}

            {isLoadingDocument && (
              <div className="px-6 py-16 text-center">

                <p className="text-sm text-slate-500">
                  Loading document...
                </p>

              </div>
            )}


            {/* Error */}

            {!isLoadingDocument &&
              documentError && (
                <div className="px-6 py-16 text-center">

                  <p className="text-sm font-medium text-slate-700">
                    Unable to load document.
                  </p>

                  <p className="mt-1 text-sm text-red-500">
                    {documentError}
                  </p>

                </div>
              )}


            {/* Document */}

            {!isLoadingDocument &&
              !documentError &&
              document && (
                <div className="p-6">


                  {/* File information */}

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">

                    <div className="flex items-start justify-between gap-4">


                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          File
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {document.file_name}
                        </p>

                      </div>


                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {document.processing_status}
                      </span>

                    </div>


                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">


                      {/* File type */}

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          File Type
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                          {document.mime_type}
                        </p>

                      </div>


                      {/* File size */}

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          File Size
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                          {(
                            document.file_size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </p>

                      </div>


                      {/* Uploaded */}

                      <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Uploaded
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                          {new Date(
                            document.created_at,
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Processing error */}

                  {document.processing_error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">

                      <p className="text-xs font-medium uppercase tracking-wide text-red-500">
                        Processing Error
                      </p>

                      <p className="mt-1 text-sm text-red-700">
                        {document.processing_error}
                      </p>

                    </div>
                  )}

                </div>
              )}

          </div>
        )}


        {/* =================================================== */}
        {/* ASK THE PAPER */}
        {/* =================================================== */}

        {activeTab === "ask" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">


            {/* Header */}

            <div className="border-b border-slate-200 px-6 py-5">

              <h2 className="text-base font-semibold text-slate-900">
                Ask the Paper
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ask questions about this paper and receive grounded answers.
              </p>

            </div>


            <div className="p-6">


              {/* Question input */}

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  value={question}
                  onChange={(event) =>
                    setQuestion(
                      event.target.value,
                    )
                  }
                  onKeyDown={(event) => {

                    if (
                      event.key ===
                        "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();

                      handleAsk();
                    }

                  }}
                  placeholder="Ask a question about this paper..."
                  disabled={isAsking}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                />


                <button
                  type="button"
                  onClick={handleAsk}
                  disabled={
                    isAsking ||
                    !question.trim()
                  }
                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isAsking
                    ? "Thinking..."
                    : "Ask"}
                </button>

              </div>


              {/* Ask error */}

              {askError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">

                  <p className="text-sm text-red-700">
                    {askError}
                  </p>

                </div>
              )}


              {/* Answer */}

              {answer && (
                <div className="mt-8">


                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Answer
                    </p>


                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {answer}
                    </p>

                  </div>


                  {/* Sources */}

                  {sources.length > 0 && (
                    <div className="mt-6">

                      <h3 className="text-sm font-semibold text-slate-900">
                        Sources
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Retrieved document chunks used to generate this answer.
                      </p>


                      <div className="mt-3 space-y-3">

                        {sources.map(
                          (source) => (
                            <div
                              key={
                                source.chunk_id
                              }
                              className="rounded-lg border border-slate-200 bg-white p-4"
                            >


                              <div className="flex items-center justify-between gap-4">

                                <span className="text-xs font-medium text-slate-500">
                                  Chunk{" "}
                                  {source.chunk_index}
                                </span>


                                <span className="text-xs text-slate-400">
                                  Similarity{" "}
                                  {(
                                    source.similarity_score *
                                    100
                                  ).toFixed(
                                    1,
                                  )}
                                  %
                                </span>

                              </div>


                              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                {source.content}
                              </p>

                            </div>
                          ),
                        )}

                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}


        {/* =================================================== */}
        {/* SUMMARY */}
        {/* =================================================== */}

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
                Summary interface
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Summary functionality will be connected next.
              </p>

            </div>

          </div>
        )}


        {/* =================================================== */}
        {/* ANALYSIS */}
        {/* =================================================== */}

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


        {/* =================================================== */}
        {/* RELATED RESEARCH */}
        {/* =================================================== */}

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
                Recommendations interface
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Semantic Scholar recommendations will be connected next.
              </p>

            </div>

          </div>
        )}

      </section>

    </div>
  );
}

export default PaperWorkspace;