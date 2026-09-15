function Assistant() {
  return (
    <div className="flex h-screen">
      {/* Conversations */}

      <aside className="w-72 shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5">
          <h1 className="text-base font-semibold text-slate-900">
            AI Assistant
          </h1>

          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-sm">
            + New Conversation
          </button>
        </div>

        <div className="p-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Conversations
          </p>

          <div className="mt-2 space-y-1">
            <button className="w-full rounded-lg bg-blue-50 px-3 py-3 text-left text-sm font-medium text-blue-700">
              Research discussion
            </button>

            <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900">
              Transformer architecture
            </button>

            <button className="w-full rounded-lg px-3 py-3 text-left text-sm text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900">
              Paper methodology
            </button>
          </div>
        </div>
      </aside>

      {/* Chat */}

      <main className="flex min-w-0 flex-1 flex-col bg-slate-50">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          <p className="text-sm font-medium text-blue-600">
            Research Intelligence
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Research discussion
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Ask questions and explore your research with AI.
          </p>
        </header>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex justify-end">
              <div className="max-w-2xl rounded-xl bg-blue-600 px-5 py-3.5 text-sm leading-6 text-white">
                What are the main ideas discussed in this research?
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-3xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700 shadow-sm">
                The research focuses on the Transformer architecture
                and explains how attention mechanisms can be used for
                sequence transduction without relying on recurrence.
              </div>
            </div>
          </div>
        </div>

        {/* Input */}

        <div className="border-t border-slate-200 bg-white px-8 py-5">
          <div className="mx-auto flex max-w-4xl gap-3">
            <input
              type="text"
              placeholder="Ask a research question..."
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-sm">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Assistant;