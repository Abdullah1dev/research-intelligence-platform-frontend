import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  askPaper,
  analyzePaper,
  getPaper,
  getPaperRecommendations,
  summarizePaper,
} from "../api/papers";

import type {
  Paper,
  PaperAnalysis,
  PaperAskSource,
  PaperRecommendation,
} from "../api/papers";

import { getPaperDocument } from "../api/documents";

import type {
  PaperDocument,
} from "../api/documents";


type Tab =
  | "overview"
  | "document"
  | "ask"
  | "summary"
  | "analysis"
  | "related";


function PaperWorkspace() {
  const { paperId } = useParams();

  const numericPaperId = Number(paperId);

  const [activeTab, setActiveTab] =
    useState<Tab>("overview");

  const [paper, setPaper] =
    useState<Paper | null>(null);

  const [document, setDocument] =
    useState<PaperDocument | null>(null);

  const [recommendations, setRecommendations] =
    useState<PaperRecommendation[]>([]);

  const [summary, setSummary] =
    useState<string | null>(null);

  const [analysis, setAnalysis] =
    useState<PaperAnalysis | null>(null);

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState<string | null>(null);

  const [sources, setSources] =
    useState<PaperAskSource[]>([]);

  const [loadingPaper, setLoadingPaper] =
    useState(true);

  const [loadingDocument, setLoadingDocument] =
    useState(false);

  const [loadingRecommendations, setLoadingRecommendations] =
    useState(false);

  const [loadingSummary, setLoadingSummary] =
    useState(false);

  const [loadingAnalysis, setLoadingAnalysis] =
    useState(false);

  const [askingQuestion, setAskingQuestion] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [documentError, setDocumentError] =
    useState<string | null>(null);

  const [summaryError, setSummaryError] =
    useState<string | null>(null);

  const [analysisError, setAnalysisError] =
    useState<string | null>(null);

  const [recommendationsError, setRecommendationsError] =
    useState<string | null>(null);


  // ==========================================
  // Load paper
  // ==========================================

  useEffect(() => {
    if (!Number.isFinite(numericPaperId)) {
      setError("Invalid paper ID.");
      setLoadingPaper(false);
      return;
    }

    async function loadPaper() {
      try {
        setLoadingPaper(true);
        setError(null);

        const data = await getPaper(
          numericPaperId,
        );

        setPaper(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load paper.",
        );
      } finally {
        setLoadingPaper(false);
      }
    }

    loadPaper();
  }, [numericPaperId]);


  // ==========================================
  // Load document
  // ==========================================

  useEffect(() => {
    if (
      activeTab !== "document" ||
      !Number.isFinite(numericPaperId)
    ) {
      return;
    }

    async function loadDocument() {
      try {
        setLoadingDocument(true);
        setDocumentError(null);

        const data =
          await getPaperDocument(
            numericPaperId,
          );

        setDocument(data);
      } catch (err) {
        setDocumentError(
          err instanceof Error
            ? err.message
            : "Failed to load document.",
        );
      } finally {
        setLoadingDocument(false);
      }
    }

    loadDocument();
  }, [activeTab, numericPaperId]);


  // ==========================================
  // Load recommendations
  // ==========================================

  useEffect(() => {
    if (
      activeTab !== "related" ||
      !Number.isFinite(numericPaperId)
    ) {
      return;
    }

    async function loadRecommendations() {
      try {
        setLoadingRecommendations(true);
        setRecommendationsError(null);

        const data =
          await getPaperRecommendations(
            numericPaperId,
          );

        setRecommendations(data);
      } catch (err) {
        setRecommendationsError(
          err instanceof Error
            ? err.message
            : "Failed to load recommendations.",
        );
      } finally {
        setLoadingRecommendations(false);
      }
    }

    loadRecommendations();
  }, [activeTab, numericPaperId]);


  // ==========================================
  // Generate summary
  // ==========================================

  async function handleGenerateSummary() {
    if (!Number.isFinite(numericPaperId)) {
      return;
    }

    try {
      setLoadingSummary(true);
      setSummaryError(null);

      const response =
        await summarizePaper(
          numericPaperId,
        );

      setSummary(response.summary);
    } catch (err) {
      setSummaryError(
        err instanceof Error
          ? err.message
          : "Failed to generate summary.",
      );
    } finally {
      setLoadingSummary(false);
    }
  }


  // ==========================================
  // Analyze paper
  // ==========================================

  async function handleAnalyzePaper() {
    if (!Number.isFinite(numericPaperId)) {
      return;
    }

    try {
      setLoadingAnalysis(true);
      setAnalysisError(null);

      const response =
        await analyzePaper(
          numericPaperId,
        );

      setAnalysis(response.analysis);
    } catch (err) {
      setAnalysisError(
        err instanceof Error
          ? err.message
          : "Failed to analyze paper.",
      );
    } finally {
      setLoadingAnalysis(false);
    }
  }


  // ==========================================
  // Ask question
  // ==========================================

  async function handleAskQuestion() {
    const trimmedQuestion =
      question.trim();

    if (
      !trimmedQuestion ||
      !Number.isFinite(numericPaperId)
    ) {
      return;
    }

    try {
      setAskingQuestion(true);
      setAnswer(null);
      setSources([]);
      setError(null);

      const response =
        await askPaper(
          numericPaperId,
          trimmedQuestion,
        );

      setAnswer(response.answer);
      setSources(response.sources);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get an answer.",
      );
    } finally {
      setAskingQuestion(false);
    }
  }


  function handleQuestionKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleAskQuestion();
    }
  }


  // ==========================================
  // Loading state
  // ==========================================

  if (loadingPaper) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500">
          Loading paper...
        </div>
      </div>
    );
  }


  // ==========================================
  // Error state
  // ==========================================

  if (error && !paper) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-800">
              Unable to load paper
            </h2>

            <p className="mt-2 text-sm text-red-700">
              {error}
            </p>

            <Link
              to="/papers"
              className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to Papers
            </Link>
          </div>
        </div>
      </div>
    );
  }


  if (!paper) {
    return null;
  }


  // ==========================================
  // Tabs
  // ==========================================

  const tabs: {
    id: Tab;
    label: string;
  }[] = [
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


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-6 py-8 lg:px-8">

        {/* ======================================
            Header
        ====================================== */}

        <div className="mx-auto max-w-7xl">

          <div className="mb-6">
            <Link
              to="/papers"
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              ← Back to Papers
            </Link>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

              <div className="max-w-4xl">

                <div className="mb-3 flex flex-wrap items-center gap-2">

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {paper.category}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {paper.publication_year}
                  </span>

                </div>


                <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                  {paper.title}
                </h1>


                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {paper.authors}
                </p>


                {paper.journal && (
                  <p className="mt-1 text-sm text-slate-500">
                    {paper.journal}
                  </p>
                )}

              </div>


              <div className="flex shrink-0 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab("ask")
                  }
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Ask Paper
                </button>

              </div>

            </div>

          </div>


          {/* ======================================
              Tabs
          ====================================== */}

          <div className="mt-6 overflow-x-auto border-b border-slate-200">

            <div className="flex min-w-max gap-6">

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`border-b-2 px-1 pb-3 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

            </div>

          </div>


          {/* ======================================
              Workspace content
          ====================================== */}

          <div className="mt-6">


            {/* ====================================
                OVERVIEW
            ==================================== */}

            {activeTab === "overview" && (
              <div className="grid gap-6 lg:grid-cols-3">

                <div className="lg:col-span-2">

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                      Abstract
                    </h2>

                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                      {paper.abstract ||
                        "No abstract available."}
                    </p>

                  </div>

                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <h2 className="text-lg font-semibold text-slate-900">
                    Paper Details
                  </h2>

                  <div className="mt-5 space-y-4">

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Publication Year
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {paper.publication_year}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Journal
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {paper.journal ||
                          "Not specified"}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Category
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {paper.category}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        DOI
                      </p>

                      <p className="mt-1 break-all text-sm text-slate-700">
                        {paper.doi ||
                          "Not available"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* ====================================
                DOCUMENT
            ==================================== */}

            {activeTab === "document" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Paper Document
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Uploaded document and processing information.
                    </p>
                  </div>

                </div>


                {loadingDocument && (
                  <div className="mt-8 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                    Loading document...
                  </div>
                )}


                {documentError && !loadingDocument && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm text-red-700">
                      {documentError}
                    </p>
                  </div>
                )}


                {!loadingDocument &&
                  !documentError &&
                  !document && (
                    <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                      <p className="text-sm font-medium text-slate-700">
                        No document connected yet.
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Upload a PDF for this paper to enable document processing and RAG.
                      </p>

                    </div>
                  )}


                {!loadingDocument &&
                  !documentError &&
                  document && (
                    <div className="mt-6">

                      <div className="grid gap-4 md:grid-cols-2">

                        <div className="rounded-xl border border-slate-200 p-5">

                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            File Name
                          </p>

                          <p className="mt-2 break-all text-sm font-medium text-slate-800">
                            {document.file_name}
                          </p>

                        </div>


                        <div className="rounded-xl border border-slate-200 p-5">

                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            File Type
                          </p>

                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {document.mime_type}
                          </p>

                        </div>


                        <div className="rounded-xl border border-slate-200 p-5">

                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            File Size
                          </p>

                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {document.file_size
                              ? `${(
                                  document.file_size /
                                  1024 /
                                  1024
                                ).toFixed(2)} MB`
                              : "Unknown"}
                          </p>

                        </div>


                        <div className="rounded-xl border border-slate-200 p-5">

                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Processing Status
                          </p>

                          <p className="mt-2 text-sm font-semibold text-indigo-600">
                            {document.processing_status}
                          </p>

                        </div>

                      </div>


                      {document.processing_error && (
                        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">

                          <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                            Processing Error
                          </p>

                          <p className="mt-2 text-sm text-red-700">
                            {document.processing_error}
                          </p>

                        </div>
                      )}

                    </div>
                  )}

              </div>
            )}


            {/* ====================================
                ASK
            ==================================== */}

            {activeTab === "ask" && (
              <div className="space-y-6">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Ask About This Paper
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Ask a question and retrieve an answer grounded in the paper.
                    </p>
                  </div>


                  <div className="mt-5">

                    <textarea
                      value={question}
                      onChange={(event) =>
                        setQuestion(
                          event.target.value,
                        )
                      }
                      onKeyDown={
                        handleQuestionKeyDown
                      }
                      rows={5}
                      placeholder="Ask something about this paper..."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <div className="mt-3 flex items-center justify-between">

                      <p className="text-xs text-slate-400">
                        Press Enter to ask. Use Shift + Enter for a new line.
                      </p>

                      <button
                        type="button"
                        onClick={
                          handleAskQuestion
                        }
                        disabled={
                          askingQuestion ||
                          !question.trim()
                        }
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {askingQuestion
                          ? "Thinking..."
                          : "Ask Question"}
                      </button>

                    </div>

                  </div>

                </div>


                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                    <p className="text-sm text-red-700">
                      {error}
                    </p>

                  </div>
                )}


                {answer && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                      Answer
                    </h2>

                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
                      {answer}
                    </p>

                  </div>
                )}


                {sources.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900">
                      Retrieved Sources
                    </h2>

                    <div className="mt-5 space-y-4">

                      {sources.map(
                        (source) => (
                          <div
                            key={
                              source.chunk_id
                            }
                            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                          >

                            <div className="flex items-center justify-between gap-4">

                              <span className="text-xs font-semibold text-indigo-600">
                                Chunk{" "}
                                {source.chunk_index}
                              </span>

                              <span className="text-xs text-slate-400">
                                Similarity:{" "}
                                {source.similarity_score.toFixed(
                                  3,
                                )}
                              </span>

                            </div>

                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
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


            {/* ====================================
                SUMMARY
            ==================================== */}

            {activeTab === "summary" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Paper Summary
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Generate an AI-powered summary of the paper.
                    </p>
                  </div>


                  <button
                    type="button"
                    onClick={
                      handleGenerateSummary
                    }
                    disabled={
                      loadingSummary
                    }
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loadingSummary
                      ? "Generating..."
                      : summary
                        ? "Regenerate Summary"
                        : "Generate Summary"}
                  </button>

                </div>


                {summaryError && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">

                    <p className="text-sm text-red-700">
                      {summaryError}
                    </p>

                  </div>
                )}


                {!summary &&
                  !loadingSummary &&
                  !summaryError && (
                    <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                      <div className="mx-auto max-w-xl">

                        <h3 className="text-base font-semibold text-slate-800">
                          No summary generated yet
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Click "Generate Summary" to analyze the uploaded paper and produce a concise summary.
                        </p>

                      </div>

                    </div>
                  )}


                {loadingSummary && (
                  <div className="mt-8 rounded-xl bg-slate-50 p-8 text-center">

                    <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />

                    <p className="mt-3 text-sm text-slate-500">
                      Generating summary from the paper...
                    </p>

                  </div>
                )}


                {summary &&
                  !loadingSummary && (
                    <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">

                      <div className="mb-4 flex items-center gap-2">

                        <div className="h-2 w-2 rounded-full bg-indigo-600" />

                        <h3 className="text-sm font-semibold text-slate-800">
                          Generated Summary
                        </h3>

                      </div>

                      <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                        {summary}
                      </p>

                    </div>
                  )}

              </div>
            )}


            {/* ====================================
                ANALYSIS
            ==================================== */}

            {activeTab === "analysis" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Paper Analysis
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Analyze the research domain, methodology, findings, limitations, and future work.
                    </p>
                  </div>


                  <button
                    type="button"
                    onClick={
                      handleAnalyzePaper
                    }
                    disabled={
                      loadingAnalysis
                    }
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loadingAnalysis
                      ? "Analyzing..."
                      : analysis
                        ? "Re-analyze Paper"
                        : "Analyze Paper"}
                  </button>

                </div>


                {analysisError && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">

                    <p className="text-sm text-red-700">
                      {analysisError}
                    </p>

                  </div>
                )}


                {!analysis &&
                  !loadingAnalysis &&
                  !analysisError && (
                    <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                      <div className="mx-auto max-w-xl">

                        <h3 className="text-base font-semibold text-slate-800">
                          No analysis generated yet
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Click "Analyze Paper" to generate a structured analysis of this research paper.
                        </p>

                      </div>

                    </div>
                  )}


                {loadingAnalysis && (
                  <div className="mt-8 rounded-xl bg-slate-50 p-8 text-center">

                    <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />

                    <p className="mt-3 text-sm text-slate-500">
                      Analyzing paper...
                    </p>

                  </div>
                )}


                {analysis &&
                  !loadingAnalysis && (
                    <div className="mt-8 space-y-5">

                      {/* Research Domain */}

                      <div className="rounded-xl border border-slate-200 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Research Domain
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {analysis.research_domain}
                        </p>

                      </div>


                      {/* Key Topics */}

                      <div className="rounded-xl border border-slate-200 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Key Topics
                        </p>

                        {analysis.key_topics.length >
                        0 ? (
                          <div className="mt-3 flex flex-wrap gap-2">

                            {analysis.key_topics.map(
                              (
                                topic,
                                index,
                              ) => (
                                <span
                                  key={`${topic}-${index}`}
                                  className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                                >
                                  {topic}
                                </span>
                              ),
                            )}

                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            No key topics available.
                          </p>
                        )}

                      </div>


                      {/* Methodology */}

                      <div className="rounded-xl border border-slate-200 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Methodology
                        </p>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                          {analysis.methodology}
                        </p>

                      </div>


                      {/* Key Findings */}

                      <div className="rounded-xl border border-slate-200 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Key Findings
                        </p>

                        {analysis.key_findings.length >
                        0 ? (
                          <ul className="mt-3 space-y-3">

                            {analysis.key_findings.map(
                              (
                                finding,
                                index,
                              ) => (
                                <li
                                  key={`${finding}-${index}`}
                                  className="flex gap-3 text-sm leading-6 text-slate-700"
                                >

                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />

                                  <span>
                                    {finding}
                                  </span>

                                </li>
                              ),
                            )}

                          </ul>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            No key findings available.
                          </p>
                        )}

                      </div>


                      {/* Limitations */}

                      <div className="rounded-xl border border-slate-200 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Limitations
                        </p>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                          {analysis.limitations}
                        </p>

                      </div>


                      {/* Future Work */}

                      <div className="rounded-xl border border-slate-200 p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Future Work
                        </p>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                          {analysis.future_work}
                        </p>

                      </div>

                    </div>
                  )}

              </div>
            )}


            {/* ====================================
                RELATED RESEARCH
            ==================================== */}

            {activeTab === "related" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Related Research
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Research papers related to this paper.
                  </p>
                </div>


                {loadingRecommendations && (
                  <div className="mt-8 rounded-xl bg-slate-50 p-8 text-center">

                    <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />

                    <p className="mt-3 text-sm text-slate-500">
                      Finding related research...
                    </p>

                  </div>
                )}


                {recommendationsError &&
                  !loadingRecommendations && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">

                      <p className="text-sm text-red-700">
                        {recommendationsError}
                      </p>

                    </div>
                  )}


                {!loadingRecommendations &&
                  !recommendationsError &&
                  recommendations.length ===
                    0 && (
                    <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                      <p className="text-sm font-medium text-slate-700">
                        No recommendations found.
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try again later or check whether Semantic Scholar has related papers for this work.
                      </p>

                    </div>
                  )}


                {!loadingRecommendations &&
                  !recommendationsError &&
                  recommendations.length >
                    0 && (
                    <div className="mt-6 grid gap-5 lg:grid-cols-2">

                      {recommendations.map(
                        (
                          recommendation,
                          index,
                        ) => (
                          <div
                            key={
                              recommendation.paperId ??
                              `${recommendation.title}-${index}`
                            }
                            className="rounded-xl border border-slate-200 p-5 transition hover:border-indigo-200 hover:shadow-sm"
                          >

                            <div className="flex items-start justify-between gap-4">

                              <h3 className="text-base font-semibold leading-6 text-slate-900">
                                {
                                  recommendation.title
                                }
                              </h3>

                              {recommendation.year && (
                                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                                  {
                                    recommendation.year
                                  }
                                </span>
                              )}

                            </div>


                            {recommendation.authors &&
                              recommendation.authors.length >
                                0 && (
                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                  {recommendation.authors
                                    .map(
                                      (
                                        author,
                                      ) =>
                                        author.name,
                                    )
                                    .join(
                                      ", ",
                                    )}
                                </p>
                              )}


                            {recommendation.abstract && (
                              <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
                                {
                                  recommendation.abstract
                                }
                              </p>
                            )}


                            <div className="mt-5 flex items-center justify-between">

                              {recommendation.citationCount !==
                                undefined && (
                                <span className="text-xs text-slate-400">
                                  {
                                    recommendation.citationCount
                                  }{" "}
                                  citations
                                </span>
                              )}


                              {recommendation.url && (
                                <a
                                  href={
                                    recommendation.url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                                >
                                  View Paper →
                                </a>
                              )}

                            </div>

                          </div>
                        ),
                      )}

                    </div>
                  )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default PaperWorkspace;