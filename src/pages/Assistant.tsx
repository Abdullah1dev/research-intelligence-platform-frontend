import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { Link } from "react-router-dom";

import {
  createConversation,
  deleteConversation,
  getConversations,
  sendMessage,
} from "../api/conversations";

import type {
  Conversation,
} from "../api/conversations";

import { getPapers } from "../api/papers";

import type {
  Paper,
} from "../api/papers";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function Assistant() {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [papers, setPapers] = useState<Paper[]>([]);

  const [selectedConversationId, setSelectedConversationId] =
    useState<number | null>(null);

  const [selectedPaperId, setSelectedPaperId] =
    useState<number | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [messageInput, setMessageInput] =
    useState("");

  const [loadingConversations, setLoadingConversations] =
    useState(true);

  const [loadingPapers, setLoadingPapers] =
    useState(true);

  const [sendingMessage, setSendingMessage] =
    useState(false);

  const [creatingConversation, setCreatingConversation] =
    useState(false);

  const [deletingConversation, setDeletingConversation] =
    useState(false);

  const [error, setError] = useState("");

  /*
   * Load conversations and papers when
   * the Assistant page opens.
   */
  useEffect(() => {
    async function loadAssistantData() {
      try {
        setError("");

        const [
          conversationsResponse,
          papersResponse,
        ] = await Promise.all([
          getConversations(),
          getPapers({
            page: 1,
            limit: 100,
            sort_by: "title",
            order: "asc",
          }),
        ]);

        setConversations(
          conversationsResponse,
        );

        setPapers(
          papersResponse.items,
        );

        /*
         * Automatically select the first
         * existing conversation.
         */
        if (conversationsResponse.length > 0) {
          setSelectedConversationId(
            conversationsResponse[0].id,
          );

          setSelectedPaperId(
            conversationsResponse[0].paper_id,
          );
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load the research assistant.",
        );
      } finally {
        setLoadingConversations(false);
        setLoadingPapers(false);
      }
    }

    loadAssistantData();
  }, []);

  /*
   * Find the currently selected conversation.
   */
  const selectedConversation =
    conversations.find(
      (conversation) =>
        conversation.id ===
        selectedConversationId,
    ) ?? null;

  /*
   * Find the paper associated with
   * the selected conversation.
   */
  const selectedPaper =
    papers.find(
      (paper) =>
        paper.id ===
        selectedConversation?.paper_id,
    ) ?? null;

  /*
   * Create a new conversation.
   */
  async function handleCreateConversation() {
    if (!selectedPaperId) {
      setError(
        "Select a paper before creating a conversation.",
      );

      return;
    }

    try {
      setCreatingConversation(true);
      setError("");

      const paper = papers.find(
        (item) =>
          item.id === selectedPaperId,
      );

      const conversation =
        await createConversation({
          paper_id: selectedPaperId,
          title: paper
            ? `Research chat — ${paper.title}`
            : "Research conversation",
        });

      setConversations(
        (current) => [
          conversation,
          ...current,
        ],
      );

      setSelectedConversationId(
        conversation.id,
      );

      setSelectedPaperId(
        conversation.paper_id,
      );

      setMessages([]);
      setMessageInput("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create conversation.",
      );
    } finally {
      setCreatingConversation(false);
    }
  }

  /*
   * Select an existing conversation.
   *
   * The current backend GET conversation endpoint
   * returns metadata but not message history.
   */
  function handleSelectConversation(
    conversation: Conversation,
  ) {
    setSelectedConversationId(
      conversation.id,
    );

    setSelectedPaperId(
      conversation.paper_id,
    );

    /*
     * Message history is not returned by the
     * current conversation API contract.
     */
    setMessages([]);

    setMessageInput("");
    setError("");
  }

  /*
   * Send a message to the research agent.
   */
  async function handleSendMessage(
  event: FormEvent<HTMLFormElement>,
) {
  event.preventDefault();

  const trimmedMessage =
    messageInput.trim();

  if (!trimmedMessage) {
    return;
  }

  if (!selectedConversationId) {
    setError(
      "Create or select a conversation first.",
    );

    return;
  }

  const userMessageId =
    `${Date.now()}-user`;

  try {
    setSendingMessage(true);
    setError("");

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: trimmedMessage,
    };

    setMessages(
      (current) => [
        ...current,
        userMessage,
      ],
    );

    setMessageInput("");

    const response =
      await sendMessage(
        selectedConversationId,
        trimmedMessage,
      );

    const assistantMessage: ChatMessage = {
      id: `${Date.now()}-assistant`,
      role: "assistant",
      content: response.answer,
    };

    setMessages(
      (current) => [
        ...current,
        assistantMessage,
      ],
    );
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Failed to send your message.",
    );

    setMessages(
      (current) =>
        current.filter(
          (message) =>
            message.id !==
            userMessageId,
        ),
    );
  } finally {
    setSendingMessage(false);
  }
}

  /*
   * Delete the selected conversation.
   */
  async function handleDeleteConversation() {
    if (!selectedConversationId) {
      return;
    }

    const conversationId =
      selectedConversationId;

    try {
      setDeletingConversation(true);
      setError("");

      await deleteConversation(
        conversationId,
      );

      const remainingConversations =
        conversations.filter(
          (conversation) =>
            conversation.id !==
            conversationId,
        );

      setConversations(
        remainingConversations,
      );

      if (
        remainingConversations.length > 0
      ) {
        const nextConversation =
          remainingConversations[0];

        setSelectedConversationId(
          nextConversation.id,
        );

        setSelectedPaperId(
          nextConversation.paper_id,
        );
      } else {
        setSelectedConversationId(
          null,
        );

        setSelectedPaperId(null);
      }

      setMessages([]);
      setMessageInput("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete conversation.",
      );
    } finally {
      setDeletingConversation(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 lg:px-10">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              Research Intelligence Platform
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              AI Research Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Ask questions and explore your research
              papers with the AI research agent.
            </p>
          </div>

          <Link
            to="/papers"
            className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
          >
            Browse Papers
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-[1600px] px-6 pt-5 lg:px-10">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Assistant */}
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-10 lg:py-6">
        <div className="grid min-h-[calc(100vh-190px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Conversation Sidebar */}
          <aside className="flex flex-col border-b border-slate-200 bg-slate-50 lg:border-b-0 lg:border-r">
            <div className="border-b border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Conversations
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your research discussions
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14M5 12h14"
                    />
                  </svg>
                </div>
              </div>

              {/* Paper selector */}
              <div className="mt-5">
                <label
                  htmlFor="paper-select"
                  className="mb-2 block text-xs font-medium text-slate-600"
                >
                  Paper for new conversation
                </label>

                <select
                  id="paper-select"
                  value={
                    selectedPaperId ?? ""
                  }
                  onChange={(event) => {
                    const value =
                      Number(
                        event.target.value,
                      );

                    setSelectedPaperId(
                      value || null,
                    );
                  }}
                  disabled={
                    loadingPapers ||
                    creatingConversation
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">
                    Select a paper
                  </option>

                  {papers.map((paper) => (
                    <option
                      key={paper.id}
                      value={paper.id}
                    >
                      {paper.title}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={
                    handleCreateConversation
                  }
                  disabled={
                    !selectedPaperId ||
                    creatingConversation ||
                    loadingPapers
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creatingConversation ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14M5 12h14"
                        />
                      </svg>

                      New Conversation
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto p-3">
              {loadingConversations ? (
                <div className="space-y-2 p-2">
                  {[1, 2, 3].map(
                    (item) => (
                      <div
                        key={item}
                        className="h-16 animate-pulse rounded-xl bg-slate-100"
                      />
                    ),
                  )}
                </div>
              ) : conversations.length ===
                0 ? (
                <div className="px-4 py-10 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 11.5a8.4 8.4 0 01-9 8.4 8.7 8.7 0 01-4-.9L3 21l1.6-4.2A8.4 8.4 0 013 11.5a9 9 0 1118 0z"
                      />
                    </svg>
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-700">
                    No conversations
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Select a paper above to start
                    your first research conversation.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {conversations.map(
                    (conversation) => {
                      const paper =
                        papers.find(
                          (item) =>
                            item.id ===
                            conversation.paper_id,
                        );

                      const isSelected =
                        conversation.id ===
                        selectedConversationId;

                      return (
                        <button
                          key={
                            conversation.id
                          }
                          type="button"
                          onClick={() =>
                            handleSelectConversation(
                              conversation,
                            )
                          }
                          className={`w-full rounded-xl px-3 py-3 text-left transition ${
                            isSelected
                              ? "bg-indigo-50 ring-1 ring-indigo-100"
                              : "hover:bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                isSelected
                                  ? "bg-indigo-100 text-indigo-600"
                                  : "bg-white text-slate-400"
                              }`}
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 4.5A2.5 2.5 0 018.5 2h9A2.5 2.5 0 0120 4.5v15a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 016 19.5v-15z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 7h7M9 11h7M9 15h4"
                                />
                              </svg>
                            </div>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`truncate text-sm font-medium ${
                                  isSelected
                                    ? "text-indigo-900"
                                    : "text-slate-800"
                                }`}
                              >
                                {conversation.title ||
                                  "Research conversation"}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-500">
                                {paper?.title ||
                                  `Paper #${conversation.paper_id}`}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Chat Area */}
          <section className="flex min-h-[600px] flex-col bg-white">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                {selectedConversation ? (
                  <>
                    <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                      Research conversation
                    </p>

                    <h2 className="mt-1 truncate text-base font-semibold text-slate-900">
                      {selectedConversation.title ||
                        "Research conversation"}
                    </h2>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {selectedPaper?.title ||
                        `Paper #${selectedConversation.paper_id}`}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Research assistant
                    </p>

                    <h2 className="mt-1 text-base font-semibold text-slate-900">
                      Start a conversation
                    </h2>
                  </>
                )}
              </div>

              {selectedConversationId && (
                <button
                  type="button"
                  onClick={
                    handleDeleteConversation
                  }
                  disabled={
                    deletingConversation ||
                    sendingMessage
                  }
                  className="ml-4 flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingConversation ? (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                  ) : (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"
                      />
                    </svg>
                  )}

                  <span className="hidden sm:inline">
                    Delete
                  </span>
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              {!selectedConversationId ? (
                <div className="flex h-full min-h-[480px] items-center justify-center">
                  <div className="max-w-md text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <svg
                        className="h-8 w-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3.5a8.5 8.5 0 018.5 8.5c0 4.7-3.8 8.5-8.5 8.5a8.4 8.4 0 01-3.4-.7L4 21l1.2-4.4A8.5 8.5 0 0112 3.5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.5 12h.01M12 12h.01M15.5 12h.01"
                        />
                      </svg>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      Research Assistant
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Select a paper and create a
                      conversation to start asking
                      questions about your research.
                    </p>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex h-full min-h-[480px] items-center justify-center">
                  <div className="max-w-lg text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <svg
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3.5a8.5 8.5 0 018.5 8.5c0 4.7-3.8 8.5-8.5 8.5a8.5 8.5 0 01-3.4-.7L4 21l1.2-4.4A8.5 8.5 0 0112 3.5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.5 12h.01M12 12h.01M15.5 12h.01"
                        />
                      </svg>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      Ask about your paper
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Ask about the paper's methodology,
                      findings, concepts, or other research
                      details.
                    </p>

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {[
                        "What is the main contribution?",
                        "Explain the methodology.",
                        "What are the key findings?",
                      ].map(
                        (suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() =>
                              setMessageInput(
                                suggestion,
                              )
                            }
                            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                          >
                            {suggestion}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-4xl space-y-6">
                  {messages.map(
                    (message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role ===
                          "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex max-w-[85%] gap-3 ${
                            message.role ===
                            "user"
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              message.role ===
                              "user"
                                ? "bg-slate-900 text-white"
                                : "bg-indigo-50 text-indigo-600"
                            }`}
                          >
                            {message.role ===
                            "user" ? (
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <circle
                                  cx="12"
                                  cy="8"
                                  r="3"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5.5 20a6.5 6.5 0 0113 0"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 3.5a8.5 8.5 0 018.5 8.5c0 4.7-3.8 8.5-8.5 8.5a8.5 8.5 0 01-3.4-.7L4 21l1.2-4.4A8.5 8.5 0 0112 3.5z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.5 12h.01M12 12h.01M15.5 12h.01"
                                />
                              </svg>
                            )}
                          </div>

                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              message.role ===
                              "user"
                                ? "bg-slate-900 text-white"
                                : "border border-slate-200 bg-slate-50 text-slate-800"
                            }`}
                          >
                            <p className="whitespace-pre-wrap text-sm leading-6">
                              {
                                message.content
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}

                  {sendingMessage && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[85%] gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 3.5a8.5 8.5 0 018.5 8.5c0 4.7-3.8 8.5-8.5 8.5a8.4 8.4 0 01-3.4-.7L4 21l1.2-4.4A8.5 8.5 0 0112 3.5z"
                            />
                          </svg>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
              <form
                onSubmit={
                  handleSendMessage
                }
                className="mx-auto max-w-4xl"
              >
                <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100">
                  <textarea
                    value={messageInput}
                    onChange={(event) =>
                      setMessageInput(
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

                        event.currentTarget.form?.requestSubmit();
                      }
                    }}
                    placeholder={
                      selectedConversationId
                        ? "Ask a question about your paper..."
                        : "Select a conversation first..."
                    }
                    disabled={
                      !selectedConversationId ||
                      sendingMessage
                    }
                    rows={2}
                    maxLength={5000}
                    className="min-h-[52px] flex-1 resize-none border-0 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                  />

                  <button
                    type="submit"
                    disabled={
                      !selectedConversationId ||
                      !messageInput.trim() ||
                      sendingMessage
                    }
                    className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sendingMessage ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    ) : (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h13"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 6l6 6-6 6"
                        />
                      </svg>
                    )}

                    <span className="hidden sm:inline">
                      Send
                    </span>
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between px-2">
                  <p className="text-[11px] text-slate-400">
                    Press Enter to send · Shift + Enter
                    for a new line
                  </p>

                  <p className="text-[11px] text-slate-400">
                    {messageInput.length}/5000
                  </p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Assistant;